/**
 * @module fxSolve/errors
 */

import * as is from 'fi-is';

interface ErrorOptions {
  name: string;
  message: string;
}

/**
 * Builds an error function.
 */
function buildError(options: ErrorOptions) {
  const isMalformed = is.empty(options) || is.empty(options.name) || is.empty(options.message);
  if (isMalformed) {
    throw new Error('Malformed custom error');
  }

  /**
   * Custom Error template.
   */
  function CustomError(message: string) {
    Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: options.name || 'CustomError'
    });

    Object.defineProperty(this, 'message', {
      enumerable: false,
      writable: true,
      value: message || options.message
    });

    Error.captureStackTrace(this, CustomError);
  }

  Object.setPrototypeOf(CustomError.prototype, Error.prototype);

  return CustomError;
}

/** Errors */
export const InvalidFormulaError = buildError({
  name: 'InvalidFormulaError',
  message: 'Invalid formula'
});

export const InvalidVariablesError = buildError({
  name: 'InvalidVariables',
  message: 'Invalid variables'
});

export const InvalidValueError = buildError({
  name: 'InvalidValueError',
  message: 'Invalid value'
});

export const InvalidReferenceError = buildError({
  name: 'InvalidReferenceError',
  message: 'The given reference is invalid'
});

export const InvalidArgumentsError = buildError({
  name: 'InvalidArgumentsError',
  message: 'The given arguments are not defined'
});

export default {
  InvalidVariablesError,
  InvalidReferenceError,
  InvalidArgumentsError,
  InvalidFormulaError,
  InvalidValueError
};
