/**
 * @module fxSolve/solve-formula
 */
import { Calculable, Context, Parser } from './interfaces';
import { FormulaResult } from './types';
/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param {Calculable} calculable
 * @param {Context} ctx
 * @param {Parser=math.parser()} parser
 * @returns FormulaResult
 */
export default function solveFormula(calculable: Calculable, ctx: Context, parser?: Parser): FormulaResult;
