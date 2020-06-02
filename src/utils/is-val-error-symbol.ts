/**
 * @module fxSolve/utils/is-val-error-symbol
 */

import { VAL_ERROR } from '../consts';

/**
 * Checks if given string is an invalud value symbol.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string a val error.
 */
export default function isValErrorSymbol(str: string): boolean {
  const re = new RegExp(VAL_ERROR);
  
  return re.test(str);
}
