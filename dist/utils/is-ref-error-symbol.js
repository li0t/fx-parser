"use strict";
/**
 * @module fxSolve/utils/is-ref-error-symbol
 */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
/**
 * Checks if given string is a missing reference symbol.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string a ref error.
 */
function isRefErrorSymbol(str) {
    const re = new RegExp(consts_1.REF_ERROR);
    return re.test(str);
}
exports.default = isRefErrorSymbol;
//# sourceMappingURL=is-ref-error-symbol.js.map