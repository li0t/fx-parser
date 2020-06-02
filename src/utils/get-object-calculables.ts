/**
 * @module fxSolve/utils/get-object-calculables
 */

import getArrayCalculables from './get-array-calculables';

import { Calculable } from '../interfaces';

/**
 * Filters all the calculable attributes of an object.
 * @param  {any} obj
 * @returns Calculables array
 */
export default function getObjectCalculables(obj): Calculable[] {
  const values = Object.values(obj);
  const calculables = getArrayCalculables(values);
  return calculables;
}
