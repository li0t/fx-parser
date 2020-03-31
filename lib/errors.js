/**
 * @module formulas/services/formulas/errors
 */
const is = require('fi-is');

/**
 * Builds an error function.
 *
 * @param {Object} options The error definition.
 * @param {String} options.name The error name.
 * @param {String} options.message The error default message.
 * @param {String} options.code The error HTTP response code.
 *
 * @returns {Error} The created custom error.
 */
function buildError(options) {
  const isMalformed = is.empty(options) || is.empty(options.name) || is.empty(options.message);
  if (isMalformed) {
    throw new Error('Malformed custom error');
  }
  /**
   * Custom Error template.
   *
   * @private
   *
   * @param {String} message The error's message.
   */
  function CustomError(message) {
    Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: options.name || 'CustomError'
    });

    Object.defineProperty(this, 'code', {
      enumerable: false,
      writable: true,
      value: options.code
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
const InvalidFormulaError = buildError({
  name: 'InvalidFormulaError',
  message: 'Invalid formula'
});

const InvalidVariablesError = buildError({
  name: 'InvalidVariables',
  message: 'Invalid variables'
});

const InvalidValueError = buildError({
  name: 'InvalidValueError',
  message: 'Invalid value'
});

const InvalidReferenceError = buildError({
  name: 'InvalidReferenceError',
  message: 'The given reference format is invalid'
});

const InvalidArgumentsError = buildError({
  name: 'InvalidArgumentsError',
  message: 'The given arguments are not defined'
});

module.exports = {
  InvalidVariablesError,
  InvalidReferenceError,
  InvalidArgumentsError,
  InvalidFormulaError,
  InvalidValueError
};
