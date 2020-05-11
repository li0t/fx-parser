/**
 * @module fxSolve/utils/service/split-expression-nodes
 */

import parseExpressionNode from './parse-expression-node';
import cleanExpression from './clean-expression';
import * as parse5 from 'parse5';
import * as math from 'mathjs';

import { Node } from '../interfaces';
/**
 * Returns an expression parsed as an html nodes tree.
 */
export default function splitExpressionNodes(expression: string): Node[] {
  const exp = cleanExpression(expression);

  const nodesString = math.parse(exp).toHTML();

  const rootNode = parse5.parseFragment(nodesString);

  return rootNode.childNodes.map(parseExpressionNode);
}
