"use strict";
/**
 * @module fxSolve/utils/is-valid-parser-val
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_ref_error_symbol_1 = require("./is-ref-error-symbol");
const is_val_error_symbol_1 = require("./is-val-error-symbol");
const is = require("fi-is");
/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param {any} val The value to check.
 * @returns {Boolean} Is the value valid for a parser variable.
 */
function isValidParserVal(val) {
    return !is.empty(val) && !is_ref_error_symbol_1.default(val) && !is_val_error_symbol_1.default(val);
}
exports.default = isValidParserVal;
//# sourceMappingURL=is-valid-parser-val.js.map