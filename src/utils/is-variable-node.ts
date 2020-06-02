/**
 * @module fxSolve/utils/is-variable-node
 */

import { Node } from '../interfaces';

/**
 * Checks if node represents a variable.
 */
export default function isVariableNode(node: Node) {
  return node.classes.includes('math-symbol');
}
