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
const SUM_FORMULA = {
  expression,
  variables,

  _id: formulaId,
  name: 'Sum'
};

// Source
const SUM_SOURCE = {
  _id: sourceId,
  name: 'SUM_SOURCE',

  ...variablesValues
};

// Calculables
const SUM_CALCULABLE: Calculable = {
  formula: SUM_FORMULA._id,
  value: null,
  variables: variablesReferences
};

// Result
const SUM_RESULT = sumArray(Object.values(variablesValues));

const SUM = {
  CALCULABLE: SUM_CALCULABLE,
  FORMULA: SUM_FORMULA,
  SOURCE: SUM_SOURCE,
  RESULT: SUM_RESULT
};

export default SUM;
