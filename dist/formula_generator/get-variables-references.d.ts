import { Variable } from "../interfaces";
/**
 * Builds an array of variables references.
 * @param {String[]} vars The array of variables names
 * @param {String} model The model to assign to each reference
 * @param {String} docId The docId to assign to each reference
 * @returns {Object[]} The variables references
 */
export default function getVariablesReferences(vars: string[], model: string, docId: string): Variable[];
