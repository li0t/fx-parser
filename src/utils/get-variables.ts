/**
 * @module fxSolve/utils/get-variables
 */

import cleanExpression from './clean-expression';
import * as math from 'mathjs';

const MATH_CONSTANTS = Object.keys(math);

/**
 * Parses a math expression string and returns an array with its variables names.
 * @param {String} expression The formula expression.
 * @returns {String[]} An array of variables names.
 */
export default function getVariables(expression: string): string[] {
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
