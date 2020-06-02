/**
 * @module fxSolve/utils/is-val-error-symbol
 */

import { VAL_ERROR } from '../consts';

/**
 * Checks if given value is a missing reference symbol
 */
export default function isValErrorSymbol(str: string): boolean {
  const re = new RegExp(VAL_ERROR);
  return re.test(str);
}
