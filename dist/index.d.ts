/**
 * @module fxSolve
 */
import { Calculable, Context, Parser } from './interfaces';
import { FormulaResult } from './types';
/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param  {Calculable} calculable
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns FormulaResult
 */
export declare function solveFormula(calculable: Calculable, ctx: Context, parser?: Parser): FormulaResult;
/**
 * Iterates over the context calculables until there is no more changes.
 * @param  {any} source
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns void
 */
export declare function solveFormulas(source: any, ctx: Context, parser?: Parser): void;
declare const fxSolve: {
    solveFormula: typeof solveFormula;
    solveFormulas: typeof solveFormulas;
};
export default fxSolve;
