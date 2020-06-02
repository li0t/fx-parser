/**
 * @module fxSolve/utils/find-value
 */
import { Variable, Context } from '../interfaces';
import { FormulaResult } from '../types';
/**
 * Searches for the value of a formula variable.
 * @param {Object} variable The variable to find.
 * @param {Object} ctx The context where to find the value.
 * @returns {Object} The found value.
 */
export default function findValue(variable: Variable, ctx: Context): FormulaResult;
