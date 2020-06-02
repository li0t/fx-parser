"use strict";
/**
 * @module fxSolve/utils/
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_unexpected_type_error_1 = require("./is-unexpected-type-error");
const errors_1 = require("../errors");
const consts_1 = require("../consts");
/**
 * Returns a fxSolve consts for a known error.
 * @param {Error|String} err The error to handle.
 * @returns {String} The fxSolve consts.
 */
function handleCalcError(err) {
    if (err instanceof errors_1.InvalidReferenceError) {
        return consts_1.REF_ERROR;
    }
    if (err instanceof errors_1.InvalidValueError || is_unexpected_type_error_1.default(err)) {
        return consts_1.VAL_ERROR;
    }
    throw err;
}
exports.default = handleCalcError;
//# sourceMappingURL=handle-calc-error.js.map