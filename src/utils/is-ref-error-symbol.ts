/**
 * @module fxSolve/utils/service/is-ref-error-symbol
 */

import { REF_ERROR } from '../consts';

/**
 * Checks if given value is a missing reference symbol
 */
export default function isRefErrorSymbol(str: string): boolean {
  const re = new RegExp(REF_ERROR);
  return re.test(str);
}
