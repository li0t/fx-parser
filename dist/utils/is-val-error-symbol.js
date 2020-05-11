"use strict";
/**
 * @module fxSolve/utils/service/is-val-error-symbol
 */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
/**
 * Checks if given value is a missing reference symbol
 */
function isValErrorSymbol(str) {
    const re = new RegExp(consts_1.VAL_ERROR);
    return re.test(str);
}
exports.default = isValErrorSymbol;
//# sourceMappingURL=is-val-error-symbol.js.map