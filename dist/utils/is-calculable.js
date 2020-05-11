"use strict";
/**
 * @module fxSolve/utils/service/is-calculable
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("fi-is");
/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
function isCalculable(attribute) {
    return is.object(attribute) && !is.empty(attribute.formula);
}
exports.default = isCalculable;
//# sourceMappingURL=is-calculable.js.map