/**
 * @module fxSolve/utils/parse-expression-node
 */

import * as _ from 'lodash';
import isConstantNode from './is-constant-node';

import { Node } from '../interfaces';

/**
 * Returns a formatted node
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
