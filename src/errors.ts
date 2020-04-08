/**
 * @module fxSolve/errors
 */

import * as is from 'fi-is';

import { ErrorInterface } from './types';

interface ErrorOptions {
  name: string;
  message: string;
}

declare class Error implements ErrorInterface {
  name: string;
  message: string;
  static captureStackTrace(object, objectConstructor?);
}

export class CustomError extends Error {
  constructor(message: string) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'invalid parameters error';
    this.message = message || 'the parameters for the request or call are incorrect.';
  }
}

/**
 * Builds an error function.
 */
function buildError(options: ErrorOptions) {
  const isMalformed = is.empty(options) || is.empty(options.name) || is.empty(options.message);
  if (isMalformed) {
    throw new Error();
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
