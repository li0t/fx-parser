/**
 * @module fxSolve/utils/split-expression-nodes
 */
import { Node } from '../interfaces';
/**
 * Parses a MathJs expression as an HTML nodes array.
 * @param {String} expression The expression to parse.
 * @returns {Object[]} The HTML nodes array.
 */
export default function splitExpressionNodes(expression: string): Node[];
