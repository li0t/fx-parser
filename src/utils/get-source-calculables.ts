/**
 * @module fxSolve/utils/service/get-source-calculables
 */

import getObjectCalculables from './get-object-calculables';
import getArrayCalculables from './get-array-calculables';

import * as is from 'fi-is';

import { Calculable } from '../interfaces';

/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculables array
 */
export default function getSourceCalculables(source: any): Calculable[] {
  if (is.object(source)) {
    return getObjectCalculables(source);
  } else if (is.array(source)) {
    return getArrayCalculables(source);
  } else {
    throw new Error(`Source must be and object or array: ${JSON.stringify(source)}`);
  }
}
