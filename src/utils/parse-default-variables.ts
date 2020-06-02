import parseDefaultReference from './parse-default-reference';
import * as is from 'fi-is';

import { Variable } from '../interfaces';
/**
 * Builds an array of variables, parsing the defaul references paths.
 * @param {String} docId The docId to assign to the variables.
 * @param {String} model The model to assign to the variables.
 * @param {String} attributePath The attribute path to be replaces in the references
 * @param {Object[]} defaultVariables The default variables array.
 * @returns {Object[]} The parsed variables.
 */
export default function parseDefaultVariables(
  docId: string,
  model: string,
  attributePath: string,
  defaultVariables
): Variable[] {
  if (!is.string(docId)) {
    throw new Error(`Invalid docId "${docId}"`);
  }

  if (!is.string(model)) {
    throw new Error(`Invalid model "${model}"`);
  }

  if (!is.string(attributePath)) {
    throw new Error(`Invalid attributePath "${attributePath}"`);
  }

  if (!is.array(defaultVariables)) {
    throw new Error(`Invalid defaultVariables "${JSON.stringify(defaultVariables)}"`);
  }

  const newVariables = defaultVariables.map((variable) => {
    if (!is.object(variable)) {
      throw new Error(`Invalid variable "${variable}"`);
    }

    const path = parseDefaultReference(attributePath, variable.reference);

    const reference = {
      docId,
      model,
      path
    };

    const newVariable = {
      name: variable.name,
      reference
    };

    return newVariable;
  });

  return newVariables;
}
