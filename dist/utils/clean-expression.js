"use strict";
/**
 * @module fxSolve/utils/service/clean-expression
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Replaces commas on constants for periods, for a given expression.
 */
function cleanExpression(expression) {
    const match = /\d,\d/.exec(expression);
    if (!match) {
        return expression;
    }
    const fixed = match.toString().replace(/,/g, '.');
    const newExp = expression.replace(match, fixed);
    return cleanExpression(newExp);
}
exports.default = cleanExpression;
//# sourceMappingURL=clean-expression.js.map