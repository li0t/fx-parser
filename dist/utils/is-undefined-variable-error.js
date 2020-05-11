"use strict";
/**
 * @module fxSolve/utils/service/is-undefined-variable-error
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mathjs returns anonymous error with the "Undefined symbol" string.
 */
function isUndefinedVariableError(err) {
    return /Undefined symbol/.test(err);
}
exports.default = isUndefinedVariableError;
//# sourceMappingURL=is-undefined-variable-error.js.map