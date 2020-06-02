/**
 * @module fxSolve/utils/is-ref-error-symbol
 */

import { REF_ERROR } from '../consts';

/**
 * Checks if given string is a missing reference symbol.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string a ref error.
 */
export default function isRefErrorSymbol(str: string): boolean {
  const re = new RegExp(REF_ERROR);

  return re.test(str);
}
