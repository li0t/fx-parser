"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module formulas/services/formulas/errors
 */
const fi_is_1 = require("fi-is");
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
    const isMalformed = fi_is_1.default.empty(options) || fi_is_1.default.empty(options.name) || fi_is_1.default.empty(options.message);
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
exports.InvalidFormulaError = buildError({
    name: 'InvalidFormulaError',
    message: 'Invalid formula'
});
exports.InvalidVariablesError = buildError({
    name: 'InvalidVariables',
    message: 'Invalid variables'
});
exports.InvalidValueError = buildError({
    name: 'InvalidValueError',
    message: 'Invalid value'
});
exports.InvalidReferenceError = buildError({
    name: 'InvalidReferenceError',
    message: 'The given reference is invalid'
});
exports.InvalidArgumentsError = buildError({
    name: 'InvalidArgumentsError',
    message: 'The given arguments are not defined'
});
exports.default = {
    InvalidVariablesError: exports.InvalidVariablesError,
    InvalidReferenceError: exports.InvalidReferenceError,
    InvalidArgumentsError: exports.InvalidArgumentsError,
    InvalidFormulaError: exports.InvalidFormulaError,
    InvalidValueError: exports.InvalidValueError
};
//# sourceMappingURL=errors.js.map