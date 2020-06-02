"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_variables_references_1 = require("./get-variables-references");
const get_variables_values_1 = require("./get-variables-values");
const get_variables_1 = require("./get-variables");
const get_object_id_1 = require("./get-object-id");
const multiply_array_1 = require("./multiply-array");
const formulaId = get_object_id_1.default();
const sourceId = get_object_id_1.default();
const variables = get_variables_1.default(2, 10);
const variablesValues = get_variables_values_1.default(variables);
const variablesReferences = get_variables_references_1.default(variables, 'Source', sourceId);
const expression = variables.join(' * ');
// Formula
const MULTIPLICATION_FORMULA = {
    expression,
    variables,
    _id: formulaId,
    name: 'MULTIPLICATION'
};
// Source
const MULTIPLICATION_SOURCE = Object.assign({ _id: sourceId, name: 'MULTIPLICATION_SOURCE' }, variablesValues);
// Calculables
const MULTIPLICATION_CALCULABLE = {
    formula: MULTIPLICATION_FORMULA._id,
    value: null,
    variables: variablesReferences
};
// Result
const MULTIPLICATION_RESULT = multiply_array_1.default(Object.values(variablesValues));
const SUM = {
    CALCULABLE: MULTIPLICATION_CALCULABLE,
    FORMULA: MULTIPLICATION_FORMULA,
    SOURCE: MULTIPLICATION_SOURCE,
    RESULT: MULTIPLICATION_RESULT
};
exports.default = SUM;
//# sourceMappingURL=multiplication.js.map