/**
 * @module fxSolve/utils/service/get-array-calculables
 */

import isCalculable from './is-calculable';
import * as is from 'fi-is';

import { Calculable } from '../interfaces';

/**
 * Filters all the calculable elements of an array.
 * @param  {Object[]} arr
 * @returns Calculables array
 */
export default function getArrayCalculables(arr): Calculable[] {
  const calculables = arr.filter((attr: Calculable) => isCalculable(attr));
  return calculables;
}
