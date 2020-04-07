"use strict";
/**
 * @module fxSolve/utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
const FORMULAS_CONSTS = require("./consts");
const parse5_1 = require("parse5");
const math = require("mathjs");
const MATH_CONSTANTS = Object.keys(math);
/**
 * Library returns anonymous error with the "Undefined symbol" string.
 */
function isUndefinedVariableError(err) {
    return /Undefined symbol/.test(err);
}
exports.isUndefinedVariableError = isUndefinedVariableError;
/**
 * Library returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
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
    const rootNode = parse5_1.default.parseFragment(nodesString);
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
//# sourceMappingURL=utils.js.map