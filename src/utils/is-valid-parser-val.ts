/**
 * @module fxSolve/utils/is-valid-parser-val
 */

import * as is from 'fi-is';

import isRefErrorSymbol from './is-ref-error-symbol';
import isValErrorSymbol from './is-val-error-symbol';

/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
export default function isValidParserVal(val: any): boolean {
  return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}
