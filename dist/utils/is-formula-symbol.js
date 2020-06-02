"use strict";
/**
 * @module fxSolve/utils/is-formula-symbol1
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FORMULAS_CONSTS = require("../consts");
/**
 * Checks if a string represents a fxSolve const.
 * @param {String} str The string to check.
 * @returns {Boolean} Is the string a fxSolve const.
 */
function isFormulaSymbol(str) {
    return !!Object.values(FORMULAS_CONSTS).find((symbol) => str === symbol);
}
exports.default = isFormulaSymbol;
//# sourceMappingURL=is-formula-symbol.js.map