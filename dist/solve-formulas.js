"use strict";
/**
 * @module fxSolve/solve-formulas
 */
Object.defineProperty(exports, "__esModule", { value: true });
const solve_formula_1 = require("./solve-formula");
const math = require("mathjs");
const is = require("fi-is");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
/**
 * Iterates over the context calculables until there is no more changes.
 * @param {any} source
 * @param {Context} ctx
 * @param {Parser=math.parser()} parser
 * @returns void
 */
function solveFormulas(source, ctx, parser = math.parser()) {
    if (is.empty(source)) {
        throw new errors_1.InvalidArgumentsError('The source is empty');
    }
    if (is.empty(ctx)) {
        throw new errors_1.InvalidArgumentsError('The ctx is empty');
    }
    if (is.empty(ctx.formulas)) {
        throw new errors_1.InvalidArgumentsError('The ctx.formulas are empty');
    }
    let valueChanged = false;
    const calculables = utils_1.getSourceCalculables(source);
    for (const calculable of calculables) {
        if (!calculable.formula) {
            continue;
        }
        const oldVal = calculable.value;
        const newVal = solve_formula_1.default(calculable, ctx, parser);
        calculable.value = newVal;
        if (oldVal !== newVal) {
            valueChanged = true;
        }
    }
    if (valueChanged) {
        solveFormulas(source, ctx, parser);
    }
}
exports.default = solveFormulas;
//# sourceMappingURL=solve-formulas.js.map