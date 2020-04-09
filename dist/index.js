"use strict";
/**
 * @module fxSolve
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("fi-is");
const mathjs_1 = require("mathjs");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param  {Calculable} calculable
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns FormulaResult
 */
function solveFormula(calculable, ctx, parser = mathjs_1.default.parser()) {
    if (is.empty(calculable)) {
        throw new errors_1.InvalidArgumentsError('The calculable is empty');
    }
    if (is.empty(ctx)) {
        throw new errors_1.InvalidArgumentsError('The ctx is empty');
    }
    if (is.empty(ctx.formulas)) {
        throw new errors_1.InvalidArgumentsError('The ctx.formulas are empty');
    }
    if (is.empty(calculable.formula)) {
        const currentVal = calculable.value;
        return currentVal;
    }
    if (is.empty(calculable.variables)) {
        throw new errors_1.InvalidVariablesError("Calculable  doesn't have its variables set");
    }
    const formula = utils_1.findFormula(ctx, calculable.formula);
    if (is.empty(formula) || is.empty(formula.expression)) {
        throw new errors_1.InvalidFormulaError(`Invalid formula ${calculable.formula}`);
    }
    try {
        for (const variable of calculable.variables) {
            const val = utils_1.findValue(variable, ctx);
            utils_1.setParserVariable(parser, variable.name, val);
        }
        return utils_1.solveExpression(formula.expression, parser);
    }
    catch (err) {
        return utils_1.handleCalcError(err);
    }
}
exports.solveFormula = solveFormula;
/**
 * Iterates over the context calculables until there is no more changes.
 * @param  {any} source
 * @param  {Context} ctx
 * @param  {Parser=math.parser()} parser
 * @returns void
 */
function solveFormulas(source, ctx, parser = mathjs_1.default.parser()) {
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
        const newVal = solveFormula(calculable, ctx, parser);
        calculable.value = newVal;
        if (oldVal !== newVal) {
            valueChanged = true;
        }
    }
    if (valueChanged) {
        solveFormulas(source, ctx, parser);
    }
}
exports.solveFormulas = solveFormulas;
const fxSolve = {
    solveFormula,
    solveFormulas
};
exports.default = fxSolve;
//# sourceMappingURL=index.js.map