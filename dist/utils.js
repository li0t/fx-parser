"use strict";
/**
 * @module formulas/services/formulas/utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const parse5_1 = require("parse5");
const mathjs_1 = require("mathjs");
const MATH_CONSTANTS = Object.keys(mathjs_1.default);
/**
 * Library returns anonymous error with the "Undefined symbol" string.
 * @param {String} err
 */
function isUndefinedVariableError(err) {
    return /Undefined symbol/.test(err);
}
exports.isUndefinedVariableError = isUndefinedVariableError;
/**
 * Library returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 * @param {String} err
 */
function isUnexpectedTypeError(err) {
    return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}
exports.isUnexpectedTypeError = isUnexpectedTypeError;
/**
 * Checks if a string represents a component custom symbol.
 * @param {String} val
 */
function isFormulaSymbol(val) {
    return !!Object.values(consts_1.default).find(symbol => val === symbol);
}
exports.isFormulaSymbol = isFormulaSymbol;
/**
 * Checks if given value is a missing reference symbol
 * @param {*} val
 */
function isRefErrorSymbol(val) {
    const re = new RegExp(consts_1.default.REF_ERROR);
    return re.test(val);
}
exports.isRefErrorSymbol = isRefErrorSymbol;
/**
 * Checks if given value is a missing reference symbol
 * @param {*} val
 */
function isValErrorSymbol(val) {
    const re = new RegExp(consts_1.default.VAL_ERROR);
    return re.test(val);
}
exports.isValErrorSymbol = isValErrorSymbol;
/**
 * Checks if node represents a variable.
 * @param {Object} node A parsed expression node
 */
function isVariableNode(node) {
    return node.classes.includes('math-symbol');
}
exports.isVariableNode = isVariableNode;
/**
 * Checks if node represents a constant.
 * @param {Object} node A parsed expression node
 */
function isConstantNode(node) {
    return node.classes.includes('math-number');
}
/**
 * Returns a formatted node
 * @private
 */
function parseExpressionNode(node) {
    const newNode = {
        classes: node.attrs.find(a => a.name === 'class').value,
        value: node.childNodes[0].value
    };
    if (isConstantNode(newNode)) {
        newNode.value = newNode.value.replace(/\./, ',');
    }
    return newNode;
}
/**
 * Returns an expression parsed as an html nodes tree.
 * @param {String} expression
 */
function splitExpressionNodes(expression) {
    const exp = cleanExpression(expression);
    const nodesString = mathjs_1.default.parse(exp).toHTML();
    const rootNode = parse5_1.default.parseFragment(nodesString);
    return rootNode.childNodes.map(parseExpressionNode);
}
exports.splitExpressionNodes = splitExpressionNodes;
/**
 * Replaces commas on constants for periods, for a given expression.
 * @param {String} expression
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
 * @param {String} expression The math expression
 */
function getVariables(expression) {
    const variables = [];
    const exp = cleanExpression(expression);
    const node = mathjs_1.default.parse(exp);
    node.traverse(n => {
        if (n.type === 'SymbolNode' && !MATH_CONSTANTS.includes(n.name)) {
            const alreadyAdded = variables.find(v => v === n.name);
            if (!alreadyAdded) {
                variables.push(n.name);
            }
        }
    });
    return variables;
}
exports.getVariables = getVariables;
exports.default = {
    isUndefinedVariableError,
    isUnexpectedTypeError,
    splitExpressionNodes,
    isValErrorSymbol,
    isRefErrorSymbol,
    isVariableNode,
    isFormulaSymbol,
    getVariables
};
//# sourceMappingURL=utils.js.map