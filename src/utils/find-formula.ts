/**
 * @module fxSolve/utils/find-formula
 */

import compareIds from './compare-ids';
import * as is from 'fi-is';

import { Formula, Context } from '../interfaces';

/**
 * Looks for a formula object in the store formulas array.
 * @param  {Context} ctx
 * @param  {any} formula
 * @returns Formula
 */
export default function findFormula(ctx: Context, formula: any): Formula {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}
