/**
 * @module fxSolve/utils/set-parser-variable
 */
import { Parser } from '../interfaces';
/**
 * Sets a variable value in a MathJs parser.
 *
 * @param {Object} parser A MathJs parser.
 * @param {String} name The name of the variable.
 * @param {any} val The value of the variable.
 */
export default function setParserVariable(parser: Parser, name: string, val: any): void;
