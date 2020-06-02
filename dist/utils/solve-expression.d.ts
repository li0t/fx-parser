/**
 * @module fxSolve/utils/solve-expression
 */
import { FormulaResult } from '../types';
import { Parser } from '../interfaces';
/**
 * Tries to solve a mathematical expression with a MathJs parser.
 * @param {String} expression The expression to solve.
 * @param {Object} parser The MathJs parser.
 * @returns {any} The expression result.
 */
export default function solveExpression(expression: string, parser: Parser): FormulaResult;
