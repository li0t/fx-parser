/**
 * @module fxSolve/utils
 */

import * as FORMULAS_CONSTS from './consts';
import parse5 from 'parse5';
import * as math from 'mathjs';

import { Node } from './interfaces';

const MATH_CONSTANTS = Object.keys(math);

/**
 * Library returns anonymous error with the "Undefined symbol" string.
 */
export function isUndefinedVariableError(err: string): boolean {
  return /Undefined symbol/.test(err);
}

/**
 * Library returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 */
export function isUnexpectedTypeError(err: string): boolean {
  return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}

/**
 * Checks if a string represents a component custom symbol.
 */
export function isFormulaSymbol(val: string): boolean {
  return !!Object.values(FORMULAS_CONSTS).find((symbol) => val === symbol);
}

/**
 * Checks if given value is a missing reference symbol
 */
export function isRefErrorSymbol(val: string): boolean {
  const re = new RegExp(FORMULAS_CONSTS.REF_ERROR);
  return re.test(val);
}

/**
 * Checks if given value is a missing reference symbol
 */
export function isValErrorSymbol(val: string): boolean {
  const re = new RegExp(FORMULAS_CONSTS.VAL_ERROR);
  return re.test(val);
}

/**
 * Checks if node represents a variable.
 */
export function isVariableNode(node: Node) {
  return node.classes.includes('math-symbol');
}

/**
 * Checks if node represents a constant.
 */
export function isConstantNode(node: Node) {
  return node.classes.includes('math-number');
}

/**
 * Returns a formatted node
 */
export function parseExpressionNode(node: Node): Node {
  const newNode: Node = {
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

/**
 * Returns an expression parsed as an html nodes tree.
 */
export function splitExpressionNodes(expression: string): Node[] {
  const exp = cleanExpression(expression);

  const nodesString = math.parse(exp).toHTML();

  const rootNode = parse5.parseFragment(nodesString);

  return rootNode.childNodes.map(parseExpressionNode);
}

/**
 * Replaces commas on constants for periods, for a given expression.
 */
export function cleanExpression(expression): string {
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
 */
export function getVariables(expression: string): string[] {
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
