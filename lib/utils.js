/**
 * @module formulas/services/formulas/utils
 */

const parse5 = require('parse5');
const math = require('mathjs');

const MATH_CONSTANTS = Object.keys(math);

const FORMULAS_CONSTS = require('./consts');

/**
 * Library returns anonymous error with the "Undefined symbol" string.
 * @param {String} err
 */
function isUndefinedVariableError(err) {
  return /Undefined symbol/.test(err);
}

/**
 * Library returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 * @param {String} err
 */
function isUnexpectedTypeError(err) {
  return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}

/**
 * Checks if a string represents a component custom symbol.
 * @param {String} val
 */
function isCustomSymbol(val) {
  return !!Object.values(FORMULAS_CONSTS).find(symbol => val === symbol);
}

/**
 * Checks if given value is a missing reference symbol
 * @param {*} val
 */
function isRefErrorSymbol(val) {
  const re = new RegExp(FORMULAS_CONSTS.REF_ERROR);
  return re.test(val);
}

/**
 * Checks if given value is a missing reference symbol
 * @param {*} val
 */
function isValErrorSymbol(val) {
  const re = new RegExp(FORMULAS_CONSTS.VAL_ERROR);
  return re.test(val);
}

/**
 * Checks if node represents a variable.
 * @param {Object} node A parsed expression node
 */
function isVariableNode(node) {
  return node.classes.includes('math-symbol');
}

/**
 * Checks if node represents a constant.
 * @param {Object} node A parsed expression node
 */
function isConstantNode(node) {
  return node.classes.includes('math-number');
}

/**
 * Returns a formatted node
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

  const nodesString = math.parse(exp).toHTML();

  const rootNode = parse5.parseFragment(nodesString);

  return rootNode.childNodes.map(parseExpressionNode);
}

/**
 * Replaces commas on constants for periods, for a given expression.
 * @private
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
/**
 * Parses a math expression string and returns an array with its variables names
 * @param {String} expression The math expression
 */
function getVariables(expression) {
  const variables = [];

  const exp = cleanExpression(expression);

  const node = math.parse(exp);

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

module.exports = {
  isUndefinedVariableError,
  isUnexpectedTypeError,
  splitExpressionNodes,
  isValErrorSymbol,
  isRefErrorSymbol,
  isVariableNode,
  isCustomSymbol,
  getVariables
};
