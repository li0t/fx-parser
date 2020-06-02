/**
 * @module fxSolve/utils/get-object-calculables
 */

import getArrayCalculables from './get-array-calculables';

import { Calculable } from '../interfaces';

/**
 * Filters all the calculable attributes of an object.
 * @param {Object} obj The object where to find the calculables.
 * @returns {Object[]} The found calculables.
 */
export default function getObjectCalculables(obj): Calculable[] {
  const values = Object.values(obj);

  const calculables = getArrayCalculables(values);

  return calculables;
}
