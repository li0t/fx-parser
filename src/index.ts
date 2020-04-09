/**
 * @module fxSolve
 */

import * as _get from 'lodash.get';
import * as math from 'mathjs';
import * as is from 'fi-is';

import { InvalidArgumentsError, InvalidVariablesError, InvalidFormulaError } from './errors';
import { Calculable, Context, Parser } from './interfaces';
import { FormulaResult } from './types';

import {
  getSourceCalculables,
  findFormula,
  findValue,
  setParserVariable,
  solveExpression,
  handleCalcError
} from './utils';
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
