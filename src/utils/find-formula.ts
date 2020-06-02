/**
 * @module fxSolve/utils/find-formula
 */

import compareIds from './compare-ids';
import * as is from 'fi-is';

import { Formula, Context } from '../interfaces';

/**
 * Looks for a formula object in the store formulas array.
 * @param {Object} ctx The context where to find the formula.
 * @param {Object|String} formula The formula to find.
 * @returns {Object} The found formula.
 */
export default function findFormula(ctx: Context, formula): Formula {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}
