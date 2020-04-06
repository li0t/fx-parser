"use strict";
/**
 * @module formulas/services/formulas
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_get_1 = require("lodash.get");
const mathjs_1 = require("mathjs");
const fi_is_1 = require("fi-is");
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const errors_1 = require("./errors");
/**
 * Compares two ids enforcing them to be strings
 * @private
 */
function compareIds(id1, id2) {
    if (fi_is_1.default.empty(id1) || fi_is_1.default.empty(id2)) {
        throw new Error('Invalid ids to compare');
    }
    const a = id1.toString ? id1.toString() : id1;
    const b = id2.toString ? id2.toString() : id2;
    return a === b;
}
/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @private
 */
function isValidParserVal(val) {
    return !fi_is_1.default.empty(val) && !utils_1.isRefErrorSymbol(val) && !utils_1.isValErrorSymbol(val);
}
/**
 * Tries to solve a mathematical expression.
 * @private
 */
function solveExpression(expression, parser) {
    try {
        const cleaned = utils_1.cleanExpression(expression);
        return parser.eval(cleaned);
    }
    catch (err) {
        if (utils_1.isUndefinedVariableError(err)) {
            return;
        }
        throw err;
    }
}
/**
 * @private
 */
function handleCalcError(err) {
    if (err instanceof errors_1.InvalidReferenceError) {
        return consts_1.default.REF_ERROR;
    }
    if (err instanceof errors_1.InvalidValueError || utils_1.isUnexpectedTypeError(err)) {
        return consts_1.default.VAL_ERROR;
    }
    throw err;
}
/**
 * Sets a variable value in a calculable parser.
 * @private
 */
function setParserVariable(parser, name, val) {
    if (!isValidParserVal(val)) {
        throw new errors_1.InvalidValueError(`Value ${val} is not a valid parser value`);
    }
    parser.set(name, val);
}
/**
 * Finds a value source in the context.
 */
function findSource(reference, ctx) {
    if (!fi_is_1.default.object(reference)) {
        throw new errors_1.InvalidVariablesError('Reference must be an object');
    }
    if (!fi_is_1.default.string(reference._id)) {
        throw new errors_1.InvalidVariablesError('Refernce _id must be a string');
    }
    if (!fi_is_1.default.string(reference.model)) {
        throw new errors_1.InvalidVariablesError('Refernce model must be a string');
    }
    if (!fi_is_1.default.object(ctx)) {
        throw new errors_1.InvalidVariablesError('Ctx must be an object');
    }
    const model = ctx[reference.model];
    if (!fi_is_1.default.array(model) || fi_is_1.default.empty(model)) {
        throw new errors_1.InvalidVariablesError(`Invalid context model "${reference.model}"`);
    }
    const source = model.find((doc) => compareIds(doc._id, reference._id));
    if (!fi_is_1.default.object(source)) {
        throw new errors_1.InvalidReferenceError(`Source ${reference._id} was not found in context model ${reference.model}`);
    }
    return source;
}
/**
 * Retrieves the formula variable reference value.
 * @private
 */
function findReference(variable, ctx) {
    if (!fi_is_1.default.object(variable)) {
        throw new errors_1.InvalidVariablesError('Variable must be an object');
    }
    const reference = variable.reference;
    if (!fi_is_1.default.object(reference)) {
        throw new errors_1.InvalidVariablesError('Reference must be an object');
    }
    if (!fi_is_1.default.string(reference.path)) {
        throw new errors_1.InvalidVariablesError('Refernce path must be a string');
    }
    if (!fi_is_1.default.object(ctx)) {
        throw new errors_1.InvalidReferenceError('Context must be an object');
    }
    const source = findSource(reference, ctx);
    const found = lodash_get_1.default(source, reference.path);
    if (found === null || found === undefined) {
        throw new errors_1.InvalidReferenceError('Invalid fetched value');
    }
    if (fi_is_1.default.object(found)) {
        found.value;
    }
    return found;
}
/**
 * Validates the required params
 * @private
 */
function validateParams(source, ctx) {
    if (fi_is_1.default.empty(source)) {
        throw new errors_1.InvalidArgumentsError('The source is empty');
    }
    if (fi_is_1.default.empty(ctx)) {
        throw new errors_1.InvalidArgumentsError('The ctx is empty');
    }
    if (fi_is_1.default.empty(ctx.formulas)) {
        throw new errors_1.InvalidArgumentsError('The source.formulas are empty');
    }
}
/**
 * Looks for a formula object in the store formulas array.
 * @private
 */
function findFormula(ctx, formula) {
    const formulaId = formula._id || formula;
    if (fi_is_1.default.empty(formula))
        throw new Error('Invalid formula');
    return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}
/**
 * Checks if an attribute is an object and has a formula
 * @private
 */
function isCalculable(attribute) {
    return fi_is_1.default.object(attribute) && !fi_is_1.default.empty(attribute.formula);
}
/**
 * Filters all the calculable attributes of an object.
 * @private
 */
function getSourceCalculables(source) {
    return Object.values(source).filter((attr) => isCalculable(attr));
}
/**
 * Tries to solve a calculable formula with it's stored variables references.
 */
function solveFormula(calculable, ctx, parser = mathjs_1.default.parser()) {
    if (fi_is_1.default.empty(calculable.formula)) {
        const currentVal = calculable.value;
        return currentVal;
    }
    if (fi_is_1.default.empty(calculable.variables)) {
        throw new errors_1.InvalidVariablesError("Calculable  doesn't have its variables set");
    }
    const formula = findFormula(ctx, calculable.formula);
    if (fi_is_1.default.empty(formula) || fi_is_1.default.empty(formula.expression)) {
        throw new errors_1.InvalidFormulaError(`Invalid formula ${calculable.formula}`);
    }
    try {
        for (const variable of calculable.variables) {
            const val = findReference(variable, ctx);
            setParserVariable(parser, variable.name, val);
        }
        return solveExpression(formula.expression, parser);
    }
    catch (err) {
        return handleCalcError(err);
    }
}
exports.solveFormula = solveFormula;
/**
 * Iterates over the context calculables until there is no more changes.
 */
function solveFormulas(source, ctx, parser = mathjs_1.default.parser()) {
    validateParams(source, ctx);
    let valueChanged;
    const calculables = getSourceCalculables(source);
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
exports.default = {
    solveFormulas,
    solveFormula
};
//# sourceMappingURL=index.js.map