/**
 * @module fxSolve/utils/is-calculable
 */

import * as is from 'fi-is';

import { Calculable } from '../interfaces';

/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
export default function isCalculable(attribute: Calculable): boolean {
  return is.object(attribute) && !is.empty(attribute.formula);
}
