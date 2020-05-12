import getVariablesReferences from './get-variables-references';
import getVariablesValues from './get-variables-values';
import getVariables from './get-variables';
import getObjectId from './get-object-id';
import sumArray from './sum-array';

import { Calculable } from '../interfaces';

const formulaId = getObjectId();
const sourceId = getObjectId();

const variables = getVariables(2, 10);
const variablesValues = getVariablesValues(variables,);
const variablesReferences = getVariablesReferences(variables, 'Source', sourceId);

const expression = variables.join(' + ');

// Formula
const ADDITION_FORMULA = {
  expression,
  variables,

  _id: formulaId,
  name: 'ADDITION'
};

// Source
const ADDITION_SOURCE = {
  _id: sourceId,
  name: 'ADDITION_SOURCE',

  ...variablesValues
};

// Calculables
const ADDITION_CALCULABLE: Calculable = {
  formula: ADDITION_FORMULA._id,
  value: null,
  variables: variablesReferences
};

// Result
const ADDITION_RESULT = sumArray(Object.values(variablesValues));

const SUM = {
  CALCULABLE: ADDITION_CALCULABLE,
  FORMULA: ADDITION_FORMULA,
  SOURCE: ADDITION_SOURCE,
  RESULT: ADDITION_RESULT
};

export default SUM;
