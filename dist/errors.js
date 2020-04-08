"use strict";
/**
 * @module fxSolve/errors
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("fi-is");
class CustomError extends Error {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'invalid parameters error';
        this.message = message || 'the parameters for the request or call are incorrect.';
    }
}
exports.CustomError = CustomError;
/**
 * Builds an error function.
 */
function buildError(options) {
    const isMalformed = is.empty(options) || is.empty(options.name) || is.empty(options.message);
    if (isMalformed) {
        throw new Error();
    }
    /**
     * Custom Error template.
     */
    function CustomError(message) {
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