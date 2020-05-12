import getVariablesReferences from './get-variables-references';
import getVariablesValues from './get-variables-values';
import getVariables from './get-variables';
import getObjectId from './get-object-id';
import multiplyArray from './multiply-array';

import { Calculable } from '../interfaces';

const formulaId = getObjectId();
const sourceId = getObjectId();

const variables = getVariables(2, 10);
const variablesValues = getVariablesValues(variables,);
const variablesReferences = getVariablesReferences(variables, 'Source', sourceId);

const expression = variables.join(' * ');

// Formula
const MULTIPLICATION_FORMULA = {
  expression,
  variables,

  _id: formulaId,
  name: 'MULTIPLICATION'
};

// Source
const MULTIPLICATION_SOURCE = {
  _id: sourceId,
  name: 'MULTIPLICATION_SOURCE',

  ...variablesValues
};

// Calculables
const MULTIPLICATION_CALCULABLE: Calculable = {
  formula: MULTIPLICATION_FORMULA._id,
  value: null,
  variables: variablesReferences
};

// Result
const MULTIPLICATION_RESULT = multiplyArray(Object.values(variablesValues));

const SUM = {
  CALCULABLE: MULTIPLICATION_CALCULABLE,
  FORMULA: MULTIPLICATION_FORMULA,
  SOURCE: MULTIPLICATION_SOURCE,
  RESULT: MULTIPLICATION_RESULT
};

export default SUM;
