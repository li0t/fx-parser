/**
 * @module fxSolve/utils/is-formula-symbol1
 */

import * as FORMULAS_CONSTS from '../consts';

/**
 * Checks if a string represents a fxSolve const.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string a fxSolve const.
 */
export default function isFormulaSymbol(str: string): boolean {
  return !!Object.values(FORMULAS_CONSTS).find((symbol) => str === symbol);
}
