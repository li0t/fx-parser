/**
 * @module fxSolve
 */

import _get from 'lodash.get';
import math from 'mathjs';
import is from 'fi-is';

import { REF_ERROR, VAL_ERROR } from './consts';

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

import { Reference, Variable, Calculable, Formula } from './interfaces';
import { calculationResult } from './types';

/**
 * Compares two ids enforcing them to be strings
 * @param  {string|object|null} id1
 * @param  {string|object|null} id2
 * @returns boolean
 */
function compareIds(id1: string | object | null, id2: string | object | null): boolean {
  if (is.empty(id1) || is.empty(id2)) {
    throw new Error('Invalid ids to compare');
  }

  const a = id1.toString ? id1.toString() : id1;

  const b = id2.toString ? id2.toString() : id2;

  return a === b;
}

/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
function isValidParserVal(val: any): boolean {
  return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}

/**
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {any} parser
 * @returns any
 */
function solveExpression(expression: string, parser: any) : any {
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
 * Returns a fxSolve consts for a known error.
 * @param  {Error|string} err
 * @returns string
 */
function handleCalcError(err: Error | string) : string {
  if (err instanceof InvalidReferenceError) {
    return REF_ERROR;
  }

  if (err instanceof InvalidValueError || isUnexpectedTypeError(<string>err)) {
    return VAL_ERROR;
  }

  throw err;
}

/**
 * Sets a variable value in a calculable parser.
 * @param  {any} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
function setParserVariable(parser: any, name: string, val: any) : void {
  if (!isValidParserVal(val)) {
    throw new InvalidValueError(`Value ${val} is not a valid parser value`);
  }

  parser.set(name, val);
}

/**
 * Finds a value source in the context.
 * @param  {Reference} reference
 * @param  {object} ctx
 * @returns object
 */
function findSource(reference: Reference, ctx: object) : object {
  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference.docId)) {
    throw new InvalidVariablesError('Refernce docId must be a string');
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

  const source = model.find((doc) => compareIds(doc._id, reference.docId));

  if (!is.object(source)) {
    throw new InvalidReferenceError(`Source ${reference.docId} was not found in context model ${reference.model}`);
  }

  return source;
}

/**
 * Retrieves the formula variable reference value.
 * @param  {Variable} variable
 * @param  {object} ctx
 * @returns any
 */
 function findReference(variable: Variable, ctx: object) :any {
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
 * Validates the required params.
 * @param  {object} source
 * @param  {any} ctx
 * @returns void
 */
function validateParams(source: object, ctx: any) : void {
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
 * @param  {any} ctx
 * @param  {any} formula
 * @returns Formula
 */
function findFormula(ctx: any, formula: any) : Formula {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}

/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
function isCalculable(attribute: Calculable) : boolean {
  return is.object(attribute) && !is.empty(attribute.formula);
}

/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculable
 */
function getSourceCalculables(source: any): Calculable[] {
  return <Calculable[]>Object.values(source).filter((attr: Calculable) => isCalculable(attr));
}

/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param  {Calculable} calculable
 * @param  {any} ctx
 * @param  {any=math.parser(} parser
 * @returns calculationResult
 */
export function solveFormula(calculable: Calculable, ctx: any, parser: any = math.parser()): calculationResult {
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
 * @param  {any} source
 * @param  {any} ctx
 * @param  {any=math.parser(} parser
 * @returns void
 */
export function solveFormulas(source: any, ctx: any, parser: any = math.parser()): void {
  validateParams(source, ctx);

  let valueChanged: boolean = false;

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
