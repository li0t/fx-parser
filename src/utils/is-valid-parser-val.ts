/**
 * @module fxSolve/utils/is-valid-parser-val
 */

import isRefErrorSymbol from './is-ref-error-symbol';
import isValErrorSymbol from './is-val-error-symbol';
import * as is from 'fi-is';

/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param {any} val The value to check.
 * @returns {Boolean} Is the value valid for a parser variable.
 */
export default function isValidParserVal(val): boolean {
  return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}
