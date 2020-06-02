"use strict";
/**
 * @module fxSolve/utils/is-val-error-symbol
 */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
/**
 * Checks if given string is an invalud value symbol.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string a val error.
 */
function isValErrorSymbol(str) {
    const re = new RegExp(consts_1.VAL_ERROR);
    return re.test(str);
}
exports.default = isValErrorSymbol;
//# sourceMappingURL=is-val-error-symbol.js.map