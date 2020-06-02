/**
 * @module fxSolve/utils/clean-expression
 */

/**
 * Replaces commas on constants for periods, for a given expression.
 * @param {String} expression The expression to clean.
 * @returns {String} The cleaned expressiob.
 */
export default function cleanExpression(expression): string {
  const match = /\d,\d/.exec(expression);

  if (!match) {
    return expression;
  }

  const fixed = match.toString().replace(/,/g, '.');

  const newExp = expression.replace(match, fixed);

  return cleanExpression(newExp);
}
