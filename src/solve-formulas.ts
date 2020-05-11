/**
 * @module fxSolve/solve-formulas
 */

import solveFormula from './solve-formula';
import * as math from 'mathjs';
import * as is from 'fi-is';

import { InvalidArgumentsError } from './errors';
import { Context, Parser } from './interfaces';
import { getSourceCalculables } from './utils';

/**
 * Iterates over the context calculables until there is no more changes.
 * @param  {any} source
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns void
 */
export default function solveFormulas(source: any, ctx: Context, parser: Parser = math.parser()): void {
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
