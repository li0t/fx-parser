/**
 * @module fxSolve/utils/get-array-calculables
 */

import isCalculable from './is-calculable';

import { Calculable } from '../interfaces';

/**
 * Filters all the calculable elements of an array.
 * @param {Object[]} arr The array where to find the calculables.
 * @returns {Object[]} The found calculables.
 */
export default function getArrayCalculables(arr): Calculable[] {
  const calculables = arr.filter((attr: Calculable) => isCalculable(attr));

  return calculables;
}
