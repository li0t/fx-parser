/**
 * @module fxSolve/utils/get-object-calculables
 */
import { Calculable } from '../interfaces';
/**
 * Filters all the calculable attributes of an object.
 * @param {Object} obj The object where to find the calculables.
 * @returns {Object[]} The found calculables.
 */
export default function getObjectCalculables(obj: any): Calculable[];
