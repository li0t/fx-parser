/**
 * @module fxSolve/utils/service/clean-expression
 */

/**
 * Replaces commas on constants for periods, for a given expression.
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
