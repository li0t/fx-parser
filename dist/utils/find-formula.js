"use strict";
/**
 * @module fxSolve/utils/find-formula
 */
Object.defineProperty(exports, "__esModule", { value: true });
const compare_ids_1 = require("./compare-ids");
const is = require("fi-is");
/**
 * Looks for a formula object in the store formulas array.
 * @param {Object} ctx The context where to find the formula.
 * @param {Object|String} formula The formula to find.
 * @returns {Object} The found formula.
 */
function findFormula(ctx, formula) {
    const formulaId = formula._id || formula;
    if (is.empty(formula))
        throw new Error('Invalid formula');
    return ctx.formulas.find((f) => compare_ids_1.default(f._id, formulaId));
}
exports.default = findFormula;
//# sourceMappingURL=find-formula.js.map