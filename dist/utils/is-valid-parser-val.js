"use strict";
/**
 * @module fxSolve/utils/service/is-valid-parser-val
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("fi-is");
const is_ref_error_symbol_1 = require("./is-ref-error-symbol");
const is_val_error_symbol_1 = require("./is-val-error-symbol");
/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
function isValidParserVal(val) {
    return !is.empty(val) && !is_ref_error_symbol_1.default(val) && !is_val_error_symbol_1.default(val);
}
exports.default = isValidParserVal;
//# sourceMappingURL=is-valid-parser-val.js.map