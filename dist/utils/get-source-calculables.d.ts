/**
 * @module fxSolve/utils/get-source-calculables
 */
import { Calculable } from '../interfaces';
/**
 * Filters all the calculable attributes of an object.
 * @param {any} source The source where to find the calculables.
 * @returns {Object[]} The found calculables.
 */
export default function getSourceCalculables(source: any): Calculable[];
