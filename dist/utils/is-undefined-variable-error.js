"use strict";
/**
 * @module fxSolve/utils/is-undefined-variable-error
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the string is a Mathjs "Undefined symbol" custom error string.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string an undefined symbol error.
 */
function isUndefinedVariableError(str) {
    return /Undefined symbol/.test(str);
}
exports.default = isUndefinedVariableError;
//# sourceMappingURL=is-undefined-variable-error.js.map