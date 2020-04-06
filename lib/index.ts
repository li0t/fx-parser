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

import Reference from './interfaces/reference';
import Variable from './interfaces/variable';
import Calculable from './interfaces/calculable';

/**
 * Compares two ids enforcing them to be strings
 * @private
 */
function compareIds(id1: string | object | null, id2: string | object | null) {
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
 */
function isValidParserVal(val: any) {
  return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}

/**
 * Tries to solve a mathematical expression.
 * @private
 */
function solveExpression(expression: string, parser: any) {
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
 */
function handleCalcError(err: Error) {
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
 */
function setParserVariable(parser: any, name: string, val: any) {
  if (!isValidParserVal(val)) {
    throw new InvalidValueError(`Value ${val} is not a valid parser value`);
  }

  parser.set(name, val);
}

/**
 * Finds a value source in the context.
 */
function findSource(reference: Reference, ctx: object) {
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
 */
function findReference(variable: Variable, ctx: object) {
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
 */
function validateParams(source: object, ctx: any) {
  if (is.empty(source)) {
    throw new InvalidArgumentsError('The source is empty');
  }

  if (is.empty(ctx)) {
    throw new InvalidArgumentsError('The ctx is empty');
  }

  if (is.empty(ctx.formulas)) {
    throw new InvalidArgumentsError('The source.formulas are empty');
  }
}

/**
 * Looks for a formula object in the store formulas array.
 * @private
 */
function findFormula(ctx: any, formula: any) {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}

/**
 * Checks if an attribute is an object and has a formula
 * @private
 */
function isCalculable(attribute: Calculable) {
  return is.object(attribute) && !is.empty(attribute.formula);
}

/**
 * Filters all the calculable attributes of an object.
 * @private
 */
function getSourceCalculables(source: any): Calculable[] {
  return <Calculable[]>Object.values(source).filter((attr: Calculable) => isCalculable(attr));
}

/**
 * Tries to solve a calculable formula with it's stored variables references.
 */
export function solveFormula(calculable: Calculable, ctx: any, parser: any = math.parser()) {
  if (is.empty(calculable.formula)) {
    const currentVal = calculable.value;
    return currentVal;
  }

  if (is.empty(calculable.variables)) {
    throw new InvalidVariablesError("Calculable  doesn't have its variables set");
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
 */
export function solveFormulas(source: any, ctx: any, parser: any = math.parser()) {
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
