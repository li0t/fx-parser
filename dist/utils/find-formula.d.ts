/**
 * @module fxSolve/utils/find-formula
 */
import { Formula, Context } from '../interfaces';
/**
 * Looks for a formula object in the store formulas array.
 * @param {Object} ctx The context where to find the formula.
 * @param {Object|String} formula The formula to find.
 * @returns {Object} The found formula.
 */
export default function findFormula(ctx: Context, formula: any): Formula;
