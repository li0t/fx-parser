/**
 * @module formulas/services/formulas
 */

const _get = require('lodash.get');
const math = require('mathjs');
const is = require('fi-is');

const FORMULAS_CONSTS = require('./consts');

const {
  cleanExpression,
  isRefErrorSymbol,
  isValErrorSymbol,
  InvalidFormulaError,
  isUnexpectedTypeError,
  isUndefinedVariableError
} = require('./utils');

const { InvalidValueError, InvalidReferenceError, InvalidArgumentsError, InvalidVariablesError } = require('./errors');

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
 * Sets either a REF_ERROR or VAL_ERROR if given error is a missing reference or invalid value error, respectively;
 * @private
 * @param {Error} err
 * @param {Object} calculable
 * @param {String} attrName
 */
function handleCalcError(err, calculable, attrName) {
  if (err instanceof InvalidReferenceError) {
    calculable[attrName] = FORMULAS_CONSTS.REF_ERROR; // eslint-disable-line no-param-reassign
    return;
  }
  if (err instanceof InvalidValueError || isUnexpectedTypeError(err)) {
    calculable[attrName] = FORMULAS_CONSTS.VAL_ERROR; // eslint-disable-line no-param-reassign
    return;
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
 * @param {Object} variable The calculable variable
 * @param {String} variable.name The variable name.
 * @param {String} variable.reference The variable reference.
 * @param {String} variable.sourceId The variable reference sourceId.
 * @param {Object} ctx Where to find the source
 * @returns {Object} The value source.
 */
function findSource(variable, ctx) {
  const sourceId = variable.sourceId;

  if (!is.string(sourceId)) {
    throw new InvalidVariablesError('Variable sourceId must be an string');
  }

  for (const attribute of ctx) {
    // Attribute of context is object
    if (is.object(attribute)) {
      // Object attribute is the source
      if (attribute._id && compareIds(sourceId, attribute._id)) {
        return attribute;
      }

      for (const subAttribute of Object.values(attribute)) {
        if (!is.object(subAttribute)) {
          continue;
        }

        const inSubAttribute = findSource(variable, subAttribute);

        // Object subAttribute is the source
        if (inSubAttribute) {
          return inSubAttribute;
        }
      }
      // Attribute of context is array
    } else if (is.array(attribute)) {
      for (const elem of attribute) {
        if (!is.object(elem)) {
          continue;
        }

        // Array elem is the source
        const inElem = findSource(variable, elem);

        if (inElem) {
          return inElem;
        }
      }
    }
  }

  return null;
}

/**
 * Retrieves the formula variable reference value.
 * @private
 * @param {Object} variable A calculable variable
 * @param {String} variable.name The variable name.
 * @param {String} variable.reference The variable reference.
 * @param {String} variable.sourceId The variable reference sourceId.
 * @param {Object} ctx Where to find the values
 * @returns {*} The found value.
 */
function findReference(calculable, variable, ctx) {
  if (!is.object(variable)) {
    throw new InvalidVariablesError('Variable must be an object');
  }

  if (!is.string(variable.reference)) {
    throw new InvalidVariablesError('Variable must have a reference');
  }

  if (!is.string(variable.sourceId)) {
    throw new InvalidVariablesError('Variable must have a sourceId');
  }

  if (!is.object(ctx)) {
    throw new InvalidReferenceError('Context must be an object');
  }

  const reference = variable.reference;

  const source = findSource(variable, ctx);

  if (!is.object(source)) {
    throw new InvalidReferenceError('Source was not found');
  }

  const val = _get(reference, source);

  if (val === null || val === undefined) {
    throw new InvalidReferenceError('Invalid fetched value');
  }

  // TODO: Somehow refactor this
  if (is.object(val)) {
    const valueAttr = calculable.valueAttr || 'value';

    return val[valueAttr];
  }

  return val;
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
 * @param {Object} store The store where to retrieve the formula
 * @param {String|Object} formula
 * @returns {Object} The found formula
 */
function findFormula(store, formula) {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return store.formulas.find(f => compareIds(f._id, formulaId));
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
  return Object.values(source).filter(attr => isCalculable(attr));
}

/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param {Object} calculable An object with a formula.
 * @param {String} calculable.valueAttr The attribute of the calculable where to store the value.
 * @param {String} calculable.formula The calculable formula.
 * @param {Array<Object>} calculable.variables The calculable variables.
 * @param {String} calculable.variables.name The variable name.
 * @param {String} calculable.variables.reference The variable reference.
 * @param {String} calculable.variables.sourceId The variable reference sourceId.
 * @param {Object} ctx Where to find the values.
 * @param {Object} [parser] A MathJS parser.
 * @returns {*} The result of the formula expression.
 */
function solveFormula(calculable, ctx, parser = math.parser()) {
  const valueAttr = calculable.valueAttr || 'value';

  if (is.empty(calculable.formula)) {
    const currentVal = calculable[valueAttr];
    return currentVal;
  }

  if (is.empty(calculable.variables)) {
    throw new InvalidVariablesError(`Calculable ${calculable._id} doesn't have its variables set`);
  }

  const formula = findFormula(calculable.formula);

  if (is.empty(formula) || is.empty(formula.expression)) {
    throw new InvalidFormulaError(`Invalid formula ${calculable.formula}`);
  }

  try {
    for (const variable of calculable.variables) {
      const val = findReference(calculable, ctx, variable);

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
 */
function solveFormulas(source, ctx, parser = math.parser()) {
  validateParams(source, ctx);

  let valueChanged;

  const calculables = getSourceCalculables(source);

  for (const calculable of calculables) {
    if (!calculable.formula) {
      continue;
    }

    const valueAttr = calculable.valueAttr || 'value';

    const oldVal = calculable[valueAttr];

    const newVal = solveFormula(calculable, ctx, parser);

    calculable[valueAttr] = newVal;

    if (oldVal !== newVal) {
      valueChanged = true;
    }
  }

  if (valueChanged) {
    solveFormulas(source, ctx, parser);
  }
}

module.exports = {
  solveFormulas,
  solveFormula
};
