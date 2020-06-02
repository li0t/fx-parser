import { Variable } from '../interfaces';
/**
 * Builds an array of variables, parsing the defaul references paths.
 * @param {String} docId The docId to assign to the variables.
 * @param {String} model The model to assign to the variables.
 * @param {String} attributePath The attribute path to be replaces in the references
 * @param {Object[]} defaultVariables The default variables array.
 * @returns {Object[]} The parsed variables.
 */
export default function parseDefaultVariables(docId: string, model: string, attributePath: string, defaultVariables: any): Variable[];
