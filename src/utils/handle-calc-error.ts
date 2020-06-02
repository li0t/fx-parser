/**
 * @module fxSolve/utils/
 */

import isUnexpectedTypeError from './is-unexpected-type-error';

import { InvalidReferenceError, InvalidValueError } from '../errors';
import { REF_ERROR, VAL_ERROR } from '../consts';

/**
 * Returns a fxSolve consts for a known error.
 * @param {Error|String} err The error to handle.
 * @returns {String} The fxSolve consts. 
 */
export default function handleCalcError(err: Error | string): string {
  if (err instanceof InvalidReferenceError) {
    return REF_ERROR;
  }

  if (err instanceof InvalidValueError || isUnexpectedTypeError(err as string)) {
    return VAL_ERROR;
  }

  throw err;
}
