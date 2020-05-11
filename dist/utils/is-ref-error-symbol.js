"use strict";
/**
 * @module fxSolve/utils/service/is-ref-error-symbol
 */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
/**
 * Checks if given value is a missing reference symbol
 */
function isRefErrorSymbol(str) {
    const re = new RegExp(consts_1.REF_ERROR);
    return re.test(str);
}
exports.default = isRefErrorSymbol;
//# sourceMappingURL=is-ref-error-symbol.js.map