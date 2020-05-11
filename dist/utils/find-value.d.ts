/**
 * @module fxSolve/utils/service/
 */
import { Variable, Context } from '../interfaces';
import { FormulaResult } from '../types';
/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
export default function findValue(variable: Variable, ctx: Context): FormulaResult;
