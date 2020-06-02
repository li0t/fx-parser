/**
 * @module fxSolve/utils/parse-expression-node
 */

import isConstantNode from './is-constant-node';

import { Node } from '../interfaces';

/**
 * Parses a MathJs node to a HTML node format.
 * @param {Object} node The node to parse.
 * @returns {Object} The HTML node.
 */
export default function parseExpressionNode(node: Node): Node {
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
