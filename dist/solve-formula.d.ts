/**
 * @module fxSolve/solve-formula
 */
import { Calculable, Context, Parser } from './interfaces';
import { FormulaResult } from './types';
/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param {Calculable} calculable The calculable with the formula.
 * @param {Context} ctx The context where to find the values.
 * @param {Object} parser A MathJs parser.
 * @returns {any} The result of the formula expression.
 */
export default function solveFormula(calculable: Calculable, ctx: Context, parser?: Parser): FormulaResult;
