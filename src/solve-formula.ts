/**
 * @module fxSolve/solve-formula
 */

import * as math from 'mathjs';
import * as is from 'fi-is';

import { InvalidArgumentsError, InvalidVariablesError, InvalidFormulaError } from './errors';
import { Calculable, Context, Parser, Formula } from './interfaces';
import { FormulaResult } from './types';

import { findFormula, findValue, setParserVariable, solveExpression, handleCalcError } from './utils';

/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param {Calculable} calculable
 * @param {Context} ctx
 * @param {Parser=math.parser()} parser
 * @returns FormulaResult
 */
export default function solveFormula(
  calculable: Calculable,
  ctx: Context,
  parser: Parser = math.parser()
): FormulaResult {
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
