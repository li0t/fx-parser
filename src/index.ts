/**
 * @module fxSolve
 */

import _get from 'lodash.get';
import math from 'mathjs';
import * as is from 'fi-is';

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

import { FormulaResult } from './types';
import { Reference, Variable, Calculable, Formula, Context, ContextModel, ModelDocument, Parser } from './interfaces';

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
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
function isCalculable(attribute: Calculable): boolean {
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
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {Parser} parser
 * @returns FormulaResult
 */
function solveExpression(expression: string, parser: Parser): FormulaResult {
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
function handleCalcError(err: Error | string): string {
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
 * @param  {Parser} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
function setParserVariable(parser: Parser, name: string, val: any): void {
  if (!isValidParserVal(val)) {
    throw new InvalidValueError(`Value ${val} is not a valid parser value`);
  }

  parser.set(name, val);
}

/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
function findDocument(reference: Reference, ctx: Context): ModelDocument {
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

  const model: ContextModel = ctx[reference.model];

  if (!is.array(model) || is.empty(model)) {
    throw new InvalidVariablesError(`Invalid context model "${reference.model}"`);
  }

  const doc = model.find((doc) => compareIds(doc._id, reference.docId));

  if (!is.object(doc)) {
    throw new InvalidReferenceError(`Document ${reference.docId} was not found in context model ${reference.model}`);
  }

  return doc;
}

/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
function findValue(variable: Variable, ctx: Context): FormulaResult {
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

  const doc = findDocument(reference, ctx);

  const found = _get(doc, reference.path);

  if (found === null || found === undefined) {
    throw new InvalidReferenceError('Invalid fetched value');
  }

  if (is.object(found)) {
    found.value;
  }

  return found;
}

/**
 * Looks for a formula object in the store formulas array.
 * @param  {Context} ctx
 * @param  {any} formula
 * @returns Formula
 */
function findFormula(ctx: Context, formula: any): Formula {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}

/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param  {Calculable} calculable
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns FormulaResult
 */
export function solveFormula(calculable: Calculable, ctx: Context, parser: Parser = math.parser()): FormulaResult {
  if (is.empty(calculable)) {
    throw new InvalidArgumentsError('The calculable is empty');
  }

  if (is.empty(ctx)) {
    throw new InvalidArgumentsError('The ctx is empty');
  }

  if (is.empty(ctx.formulas)) {
    throw new InvalidArgumentsError('The ctx.formulas are empty');
  }

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
      const val = findValue(variable, ctx);

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
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns void
 */
export function solveFormulas(source: any, ctx: Context, parser: Parser = math.parser()): void {
  if (is.empty(source)) {
    throw new InvalidArgumentsError('The source is empty');
  }

  if (is.empty(ctx)) {
    throw new InvalidArgumentsError('The ctx is empty');
  }

  if (is.empty(ctx.formulas)) {
    throw new InvalidArgumentsError('The ctx.formulas are empty');
  }

  let valueChanged = false;

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

const fxSolve = {
  solveFormula,
  solveFormulas
};

export default fxSolve;
