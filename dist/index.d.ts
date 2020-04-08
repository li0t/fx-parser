/**
 * @module fxSolve
 */
import { Calculable } from './interfaces';
import { calculationResult } from './types';
/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param  {Calculable} calculable
 * @param  {any} ctx
 * @param  {any=math.parser(} parser
 * @returns calculationResult
 */
export declare function solveFormula(calculable: Calculable, ctx: any, parser?: any): calculationResult;
/**
 * Iterates over the context calculables until there is no more changes.
 * @param  {any} source
 * @param  {any} ctx
 * @param  {any=math.parser(} parser
 * @returns void
 */
export declare function solveFormulas(source: any, ctx: any, parser?: any): void;
declare const fxSolve: {
    solveFormula: typeof solveFormula;
    solveFormulas: typeof solveFormulas;
};
export default fxSolve;
