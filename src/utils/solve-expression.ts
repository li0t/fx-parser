/**
 * @module fxSolve/utils/solve-expression
 */

import isUndefinedVariableError from './is-undefined-variable-error';
import cleanExpression from './clean-expression';

import { FormulaResult } from '../types';
import { Parser } from '../interfaces';

/**
 * Tries to solve a mathematical expression with a MathJs parser.
 * @param {String} expression The expression to solve.
 * @param {Object} parser The MathJs parser.
 * @returns {any} The expression result.
 */
export default function solveExpression(expression: string, parser: Parser): FormulaResult {
  try {
    const cleaned = cleanExpression(expression);

    const value = parser.evaluate(cleaned);

    const parsed = parseFloat(value);

    if (!isNaN(parsed)) {
      return parsed;
    }

    return value;
  } catch (err) {
    if (isUndefinedVariableError(err)) {
      return;
    }

    throw err;
  }
}
