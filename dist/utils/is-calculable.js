"use strict";
/**
 * @module fxSolve/utils/is-calculable
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("fi-is");
/**
 * Checks if an attribute is an object and has a formula.
 * @param {Object} attribute The object attribute to check.
 * @returns {Boolean} Is the attribute calculable.
 */
function isCalculable(attribute) {
    return is.object(attribute) && !is.empty(attribute.formula);
}
exports.default = isCalculable;
//# sourceMappingURL=is-calculable.js.map