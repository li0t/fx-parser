"use strict";
/**
 * @module fxSolve/utils/is-unexpected-type-error
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the given string is a Mathjs "Unexpected type (...)" or "Cannot convert (...)" string error.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string an unexpected type error.
 */
function isUnexpectedTypeError(str) {
    return /Unexpected type/.test(str) || /Cannot convert/.test(str);
}
exports.default = isUnexpectedTypeError;
//# sourceMappingURL=is-unexpected-type-error.js.map