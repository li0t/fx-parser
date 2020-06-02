/**
 * @module fxSolve/utils/is-constant-node
 */

import { Node } from '../interfaces';

/**
 * Checks if node represents a constant.
 */
export default function isConstantNode(node: Node) {
  return node.classes.includes('math-number');
}
