"use strict";
/**
 * @module fxSolve/utils/service/find-formula
 */
Object.defineProperty(exports, "__esModule", { value: true });
const compare_ids_1 = require("./compare-ids");
const is = require("fi-is");
/**
 * Looks for a formula object in the store formulas array.
 * @param  {Context} ctx
 * @param  {any} formula
 * @returns Formula
 */
function findFormula(ctx, formula) {
    const formulaId = formula._id || formula;
    if (is.empty(formula))
        throw new Error('Invalid formula');
    return ctx.formulas.find((f) => compare_ids_1.default(f._id, formulaId));
}
exports.default = findFormula;
//# sourceMappingURL=find-formula.js.map