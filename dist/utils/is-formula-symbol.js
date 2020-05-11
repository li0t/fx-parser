"use strict";
/**
 * @module fxSolve/utils/service/is-formula-symbol1
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FORMULAS_CONSTS = require("../consts");
/**
 * Checks if a string represents a component custom symbol.
 */
function isFormulaSymbol(val) {
    return !!Object.values(FORMULAS_CONSTS).find((symbol) => val === symbol);
}
exports.default = isFormulaSymbol;
//# sourceMappingURL=is-formula-symbol.js.map