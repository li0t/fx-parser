"use strict";
/**
 * @module fxSolve/utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FORMULAS_CONSTS = require("./consts");
const parse5 = require("parse5");
const math = require("mathjs");
const _ = require("lodash");
const is = require("fi-is");
const errors_1 = require("./errors");
const MATH_CONSTANTS = Object.keys(math);
/**
 * Mathjs returns anonymous error with the "Undefined symbol" string.
 */
function isUndefinedVariableError(err) {
    return /Undefined symbol/.test(err);
}
exports.isUndefinedVariableError = isUndefinedVariableError;
/**
 * Mathjs returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 */
function isUnexpectedTypeError(err) {
    return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}
exports.isUnexpectedTypeError = isUnexpectedTypeError;
/**
 * Checks if a string represents a component custom symbol.
 */
function isFormulaSymbol(val) {
    return !!Object.values(FORMULAS_CONSTS).find((symbol) => val === symbol);
}
exports.isFormulaSymbol = isFormulaSymbol;
/**
 * Checks if given value is a missing reference symbol
 */
function isRefErrorSymbol(val) {
    const re = new RegExp(FORMULAS_CONSTS.REF_ERROR);
    return re.test(val);
}
exports.isRefErrorSymbol = isRefErrorSymbol;
/**
 * Checks if given value is a missing reference symbol
 */
function isValErrorSymbol(val) {
    const re = new RegExp(FORMULAS_CONSTS.VAL_ERROR);
    return re.test(val);
}
exports.isValErrorSymbol = isValErrorSymbol;
/**
 * Checks if node represents a variable.
 */
function isVariableNode(node) {
    return node.classes.includes('math-symbol');
}
exports.isVariableNode = isVariableNode;
/**
 * Checks if node represents a constant.
 */
function isConstantNode(node) {
    return node.classes.includes('math-number');
}
exports.isConstantNode = isConstantNode;
/**
 * Returns a formatted node
 */
function parseExpressionNode(node) {
    const newNode = {
        classes: node.attrs.find((attr) => attr.name === 'class').value,
        value: node.childNodes[0].value,
        childNodes: [],
        attrs: []
    };
    if (isConstantNode(newNode)) {
        newNode.value = newNode.value.replace(/\./, ',');
    }
    return newNode;
}
exports.parseExpressionNode = parseExpressionNode;
/**
 * Returns an expression parsed as an html nodes tree.
 */
function splitExpressionNodes(expression) {
    const exp = cleanExpression(expression);
    const nodesString = math.parse(exp).toHTML();
    const rootNode = parse5.parseFragment(nodesString);
    return rootNode.childNodes.map(parseExpressionNode);
}
exports.splitExpressionNodes = splitExpressionNodes;
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
exports.cleanExpression = cleanExpression;
/**
 * Parses a math expression string and returns an array with its variables names
 */
function getVariables(expression) {
    const variables = [];
    const exp = cleanExpression(expression);
    const node = math.parse(exp);
    node.traverse((n) => {
        if (n.type === 'SymbolNode' && !MATH_CONSTANTS.includes(n.name)) {
            const alreadyAdded = variables.find((v) => v === n.name);
            if (!alreadyAdded) {
                variables.push(n.name);
            }
        }
    });
    return variables;
}
exports.getVariables = getVariables;
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
exports.compareIds = compareIds;
/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
function isValidParserVal(val) {
    return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}
exports.isValidParserVal = isValidParserVal;
/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
function isCalculable(attribute) {
    return is.object(attribute) && !is.empty(attribute.formula);
}
exports.isCalculable = isCalculable;
/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculable
 */
function getSourceCalculables(source) {
    return Object.values(source).filter((attr) => isCalculable(attr));
}
exports.getSourceCalculables = getSourceCalculables;
/**
 * Returns a fxSolve consts for a known error.
 * @param  {Error|string} err
 * @returns string
 */
function handleCalcError(err) {
    if (err instanceof errors_1.InvalidReferenceError) {
        return FORMULAS_CONSTS.REF_ERROR;
    }
    if (err instanceof errors_1.InvalidValueError || isUnexpectedTypeError(err)) {
        return FORMULAS_CONSTS.VAL_ERROR;
    }
    throw err;
}
exports.handleCalcError = handleCalcError;
/**
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {Parser} parser
 * @returns FormulaResult
 */
function solveExpression(expression, parser) {
    try {
        const cleaned = cleanExpression(expression);
        return parser.eval(cleaned);
    }
    catch (err) {
        if (isUndefinedVariableError(err)) {
            return;
        }
        throw err;
    }
}
exports.solveExpression = solveExpression;
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
exports.setParserVariable = setParserVariable;
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
exports.findDocument = findDocument;
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
    const found = _.get(doc, reference.path);
    if (found === null || found === undefined) {
        throw new errors_1.InvalidReferenceError('Invalid fetched value');
    }
    if (is.object(found)) {
        return found.value;
    }
    return found;
}
exports.findValue = findValue;
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
exports.findFormula = findFormula;
//# sourceMappingURL=utils.js.map