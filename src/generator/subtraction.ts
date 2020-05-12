import getVariablesReferences from './get-variables-references';
import getVariablesValues from './get-variables-values';
import getVariables from './get-variables';
import getObjectId from './get-object-id';
import subtractArray from './subtract-array';

import { Calculable } from '../interfaces';

const formulaId = getObjectId();
const sourceId = getObjectId();

const variables = getVariables(2, 10);
const variablesValues = getVariablesValues(variables,);
const variablesReferences = getVariablesReferences(variables, 'Source', sourceId);

const expression = variables.join(' - ');

// Formula
const SUBTRACT_FORMULA = {
  expression,
  variables,

  _id: formulaId,
  name: 'SUBTRACT'
};

// Source
const SUBTRACT_SOURCE = {
  _id: sourceId,
  name: 'SUBTRACT_SOURCE',

  ...variablesValues
};

// Calculables
const SUBTRACT_CALCULABLE: Calculable = {
  formula: SUBTRACT_FORMULA._id,
  value: null,
  variables: variablesReferences
};

// Result
const SUBTRACT_RESULT = subtractArray(Object.values(variablesValues));

const SUBTRACT = {
  CALCULABLE: SUBTRACT_CALCULABLE,
  FORMULA: SUBTRACT_FORMULA,
  SOURCE: SUBTRACT_SOURCE,
  RESULT: SUBTRACT_RESULT
};

export default SUBTRACT;
