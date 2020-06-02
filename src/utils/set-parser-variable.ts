/**
 * @module fxSolve/utils/set-parser-variable
 */

import isValidParserVal from './is-valid-parser-val';

import { InvalidValueError } from '../errors';
import { Parser } from '../interfaces';

/**
 * Sets a variable value in a calculable parser.
 * @param  {Parser} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
export default function setParserVariable(parser: Parser, name: string, val: any): void {
  if (!isValidParserVal(val)) {
    throw new InvalidValueError(`Value ${val} is not a valid parser value`);
  }

  parser.set(name, val);
}
