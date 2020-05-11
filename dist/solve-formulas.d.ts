/**
 * @module fxSolve/solve-formulas
 */
import { Context, Parser } from './interfaces';
/**
 * Iterates over the context calculables until there is no more changes.
 * @param  {any} source
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns void
 */
export default function solveFormulas(source: any, ctx: Context, parser?: Parser): void;
