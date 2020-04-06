/**
 * @module formulas/services/formulas
 */

import _get from 'lodash.get';
import math from 'mathjs';
import is from 'fi-is';

import FORMULAS_CONSTS from './consts';

import {
  cleanExpression,
  isRefErrorSymbol,
  isValErrorSymbol,
  isUnexpectedTypeError,
  isUndefinedVariableError
} from './utils';

import {
  InvalidValueError,
  InvalidReferenceError,
  InvalidArgumentsError,
  InvalidVariablesError,
  InvalidFormulaError
} from './errors';

/**
 * Compares two ids enforcing them to be strings
 * @private
 * @param {Object|String} id1 First id to compare
 * @param {Object|String} id2 Second id to compare
 */
function compareIds(id1, id2) {
  if (is.empty(id1) || is.empty(id2)) {
    throw new Error('Invalid ids to compare');
  }

  const a = id1.toString ? id1.toString() : id1;

  const b = id2.toString ? id2.toString() : id2;

  return a === b;
}

/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @private
 * @param {*} val
 */
function isValidParserVal(val) {
  return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}

/**
 * Tries to solve a mathematical expression.
 * @private
 * @param {String} calculable
 * @param {String} attrName
 * @returns {Number|Boolean|String} The result of the expression parsing
 */
function solveExpression(expression, parser) {
  try {
    const cleaned = cleanExpression(expression);

    return parser.eval(cleaned);
  } catch (err) {
    if (isUndefinedVariableError(err)) {
      return;
    }

    throw err;
  }
}

/**
 * @private
 * @param {Error} err
 */
function handleCalcError(err) {
  if (err instanceof InvalidReferenceError) {
    return FORMULAS_CONSTS.REF_ERROR;
  }

  if (err instanceof InvalidValueError || isUnexpectedTypeError(err)) {
    return FORMULAS_CONSTS.VAL_ERROR;
  }

  throw err;
}

/**
 * Sets a variable value in a calculable parser.
 * @private
 * @param {Object} parser
 * @param {String} name
 * @param {*} val
 */
function setParserVariable(parser, name, val) {
  if (!isValidParserVal(val)) {
    throw new InvalidValueError(`Value ${val} is not a valid parser value`);
  }

  parser.set(name, val);
}

/**
 * Finds a value source in the context.
 * @param {Object} reference The variable reference.
 * @param {Object} reference._id The ID of the referenced document.
 * @param {Object} reference.model The model of the referenced document.
 * @param {Object} reference.path The path of the referenced document.
 * @param {Object} ctx Where to find the source
 * @returns {Object} The value source.
 */
function findSource(reference, ctx) {
  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference._id)) {
    throw new InvalidVariablesError('Refernce _id must be a string');
  }

  if (!is.string(reference.model)) {
    throw new InvalidVariablesError('Refernce model must be a string');
  }

  if (!is.object(ctx)) {
    throw new InvalidVariablesError('Ctx must be an object');
  }

  const model = ctx[reference.model];

  if (!is.array(model) || is.empty(model)) {
    throw new InvalidVariablesError(`Invalid context model "${reference.model}"`);
  }

  const source = model.find((doc) => compareIds(doc._id, reference._id));

  if (!is.object(source)) {
    throw new InvalidReferenceError(`Source ${reference._id} was not found in context model ${reference.model}`);
  }

  return source;
}

/**
 * Retrieves the formula variable reference value.
 * @private
 * @param {Object} variable A calculable variable
 * @param {String} variable.name The variable name.
 * @param {Object} variable.reference The variable reference.
 * @param {Object} variable.reference._id The ID of the referenced document.
 * @param {Object} variable.reference.model The model of the referenced document.
 * @param {Object} variable.reference.path The path of the referenced document.
 * @param {Object} ctx Where to find the values
 * @returns {*} The found value.
 */
function findReference(variable, ctx) {
  if (!is.object(variable)) {
    throw new InvalidVariablesError('Variable must be an object');
  }

  const reference = variable.reference;

  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference.path)) {
    throw new InvalidVariablesError('Refernce path must be a string');
  }

  if (!is.object(ctx)) {
    throw new InvalidReferenceError('Context must be an object');
  }

  const source = findSource(reference, ctx);

  const found = _get(source, reference.path);

  if (found === null || found === undefined) {
    throw new InvalidReferenceError('Invalid fetched value');
  }

  if (is.object(found)) {
    found.value;
  }

  return found;
}

/**
 * Validates the required params
 * @private
 * @param {Object} source The object containing the formulas to solve.
 * @param {Object} ctx Where to find the values
 */
function validateParams(source, ctx) {
  if (is.empty(source)) {
    throw new InvalidArgumentsError('The source is empty');
  }
  if (is.empty(ctx.formulas)) {
    throw new InvalidArgumentsError('The source.formulas are empty');
  }

  if (is.empty(ctx)) {
    throw new InvalidArgumentsError('The ctx is empty');
  }
}

/**
 * Looks for a formula object in the store formulas array.
 * @private
 * @param {Object} ctx The store where to retrieve the formula
 * @param {String|Object} formula
 * @returns {Object} The found formula
 */
function findFormula(ctx, formula) {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}

/**
 * Checks if an attribute is an object and has a formula
 * @private
 * @param {*} attribute
 */
function isCalculable(attribute) {
  return is.object(attribute) && !is.empty(attribute.formula);
}

/**
 * Filters all the calculable attributes of an object.
 * @private
 * @param {Object} source The object containing the formulas to solve.
 * @returns {Object} Calculable attributes.
 */
function getSourceCalculables(source) {
  return Object.values(source).filter((attr) => isCalculable(attr));
}

/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param {Object} calculable An object with a formula.
 * @param {String} calculable.formula The calculable formula.
 * @param {Array<Object>} calculable.variables The calculable variables.
 * @param {Object} ctx Where to find the values.
 * @param {Object} [parser] A MathJS parser.
 * @returns {*} The result of the formula expression.
 */
export function solveFormula(calculable, ctx, parser = math.parser()) {
  if (is.empty(calculable.formula)) {
    const currentVal = calculable.value;
    return currentVal;
  }

  if (is.empty(calculable.variables)) {
    throw new InvalidVariablesError(`Calculable ${calculable._id} doesn't have its variables set`);
  }

  const formula = findFormula(ctx, calculable.formula);

  if (is.empty(formula) || is.empty(formula.expression)) {
    throw new InvalidFormulaError(`Invalid formula ${calculable.formula}`);
  }

  try {
    for (const variable of calculable.variables) {
      const val = findReference(variable, ctx);

      setParserVariable(parser, variable.name, val);
    }

    return solveExpression(formula.expression, parser);
  } catch (err) {
    return handleCalcError(err);
  }
}

/**
 * Iterates over the context calculables until there is no more changes.
 * @param {Object} source The object containing the formulas to solve.
 * @param {Object} ctx Where to find the values.
 * @param {Object} [parser] A MathJS parser.
 * @returns {Object} The parsing results.
 */
export function solveFormulas(source, ctx, parser = math.parser()) {
  validateParams(source, ctx);

  let valueChanged;

  const calculables = getSourceCalculables(source);

  for (const calculable of calculables) {
    if (!calculable.formula) {
      continue;
    }

    const oldVal = calculable.value;

    const newVal = solveFormula(calculable, ctx, parser);

    calculable.value = newVal;

    if (oldVal !== newVal) {
      valueChanged = true;
    }
  }

  if (valueChanged) {
    solveFormulas(source, ctx, parser);
  }
}

export default {
  solveFormulas,
  solveFormula
};
