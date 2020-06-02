/**
 * @module fxSolve/utils/is-calculable
 */

import * as is from 'fi-is';

import { Calculable } from '../interfaces';

/**
 * Checks if an attribute is an object and has a formula.
 * @param {Object} attribute The object attribute to check.
 * @returns {Boolean} Is the attribute calculable.
 */
export default function isCalculable(attribute: Calculable): boolean {
  return is.object(attribute) && !is.empty(attribute.formula);
}
