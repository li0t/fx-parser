/**
 * @module fxSolve/utils/service/solve-expression
 */
import { FormulaResult } from '../types';
import { Parser } from '../interfaces';
/**
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {Parser} parser
 * @returns FormulaResult
 */
export default function solveExpression(expression: string, parser: Parser): FormulaResult;
