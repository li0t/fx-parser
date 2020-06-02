"use strict";
/**
 * @module fxSolve/solve-formula
 */
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
const is = require("fi-is");
const errors_1 = require("./errors");
const utils_1 = require("./utils");
/**
 * Tries to solve a calculable formula with it's stored variables references.
 * @param {Calculable} calculable
 * @param {Context} ctx
 * @param {Parser=math.parser()} parser
 * @returns FormulaResult
 */
function solveFormula(calculable, ctx, parser = math.parser()) {
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
exports.default = solveFormula;
//# sourceMappingURL=solve-formula.js.map