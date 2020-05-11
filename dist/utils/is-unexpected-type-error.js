"use strict";
/**
 * @module fxSolve/utils/service/is-unexpected-type-error
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mathjs returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 */
function isUnexpectedTypeError(err) {
    return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}
exports.default = isUnexpectedTypeError;
//# sourceMappingURL=is-unexpected-type-error.js.map