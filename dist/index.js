"use strict";
/**
 * @module fxSolve
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_get_1 = require("lodash.get");
const mathjs_1 = require("mathjs");
const is = require("fi-is");
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const errors_1 = require("./errors");
/**
 * Compares two ids enforcing them to be strings
 * @param  {string|object|null} id1
 * @param  {string|object|null} id2
 * @returns boolean
 */
function compareIds(id1, id2) {
    if (is.empty(id1) || is.empty(id2)) {
        throw new Error('Invalid ids to compare');
    }
    const a = id1.toString ? id1.toString() : id1;
    const b = id2.toString ? id2.toString() : id2;
    return a === b;
}
/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
function isValidParserVal(val) {
    return !is.empty(val) && !utils_1.isRefErrorSymbol(val) && !utils_1.isValErrorSymbol(val);
}
/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
function isCalculable(attribute) {
    return is.object(attribute) && !is.empty(attribute.formula);
}
/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculable
 */
function getSourceCalculables(source) {
    return Object.values(source).filter((attr) => isCalculable(attr));
}
/**
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {Parser} parser
 * @returns FormulaResult
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
 * Returns a fxSolve consts for a known error.
 * @param  {Error|string} err
 * @returns string
 */
function handleCalcError(err) {
    if (err instanceof errors_1.InvalidReferenceError) {
        return consts_1.REF_ERROR;
    }
    if (err instanceof errors_1.InvalidValueError || utils_1.isUnexpectedTypeError(err)) {
        return consts_1.VAL_ERROR;
    }
    throw err;
}
/**
 * Sets a variable value in a calculable parser.
 * @param  {Parser} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
function setParserVariable(parser, name, val) {
    if (!isValidParserVal(val)) {
        throw new errors_1.InvalidValueError(`Value ${val} is not a valid parser value`);
    }
    parser.set(name, val);
}
/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
function findDocument(reference, ctx) {
    if (!is.object(reference)) {
        throw new errors_1.InvalidVariablesError('Reference must be an object');
    }
    if (!is.string(reference.docId)) {
        throw new errors_1.InvalidVariablesError('Refernce docId must be a string');
    }
    if (!is.string(reference.model)) {
        throw new errors_1.InvalidVariablesError('Refernce model must be a string');
    }
    if (!is.object(ctx)) {
        throw new errors_1.InvalidVariablesError('Ctx must be an object');
    }
    const model = ctx[reference.model];
    if (!is.array(model) || is.empty(model)) {
        throw new errors_1.InvalidVariablesError(`Invalid context model "${reference.model}"`);
    }
    const doc = model.find((doc) => compareIds(doc._id, reference.docId));
    if (!is.object(doc)) {
        throw new errors_1.InvalidReferenceError(`Document ${reference.docId} was not found in context model ${reference.model}`);
    }
    return doc;
}
/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
function findValue(variable, ctx) {
    if (!is.object(variable)) {
        throw new errors_1.InvalidVariablesError('Variable must be an object');
    }
    const reference = variable.reference;
    if (!is.object(reference)) {
        throw new errors_1.InvalidVariablesError('Reference must be an object');
    }
    if (!is.string(reference.path)) {
        throw new errors_1.InvalidVariablesError('Refernce path must be a string');
    }
    if (!is.object(ctx)) {
        throw new errors_1.InvalidReferenceError('Context must be an object');
    }
    const doc = findDocument(reference, ctx);
    const found = lodash_get_1.default(doc, reference.path);
    if (found === null || found === undefined) {
        throw new errors_1.InvalidReferenceError('Invalid fetched value');
    }
    if (is.object(found)) {
        found.value;
    }
    return found;
}
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
    return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}
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
    const formula = findFormula(ctx, calculable.formula);
    if (is.empty(formula) || is.empty(formula.expression)) {
        throw new errors_1.InvalidFormulaError(`Invalid formula ${calculable.formula}`);
    }
    try {
        for (const variable of calculable.variables) {
            const val = findValue(variable, ctx);
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
const fxSolve = {
    solveFormula,
    solveFormulas
};
exports.default = fxSolve;
//# sourceMappingURL=index.js.map