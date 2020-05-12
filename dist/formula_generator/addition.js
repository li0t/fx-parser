"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_variables_references_1 = require("./get-variables-references");
const get_variables_values_1 = require("./get-variables-values");
const get_variables_1 = require("./get-variables");
const get_object_id_1 = require("./get-object-id");
const sum_array_1 = require("./sum-array");
const formulaId = get_object_id_1.default();
const sourceId = get_object_id_1.default();
const variables = get_variables_1.default(2, 10);
const variablesValues = get_variables_values_1.default(variables);
const variablesReferences = get_variables_references_1.default(variables, 'Source', sourceId);
const expression = variables.join(' + ');
// Formula
const ADDITION_FORMULA = {
    expression,
    variables,
    _id: formulaId,
    name: 'ADDITION'
};
// Source
const ADDITION_SOURCE = Object.assign({ _id: sourceId, name: 'ADDITION_SOURCE' }, variablesValues);
// Calculables
const ADDITION_CALCULABLE = {
    formula: ADDITION_FORMULA._id,
    value: null,
    variables: variablesReferences
};
// Result
const ADDITION_RESULT = sum_array_1.default(Object.values(variablesValues));
const SUM = {
    CALCULABLE: ADDITION_CALCULABLE,
    FORMULA: ADDITION_FORMULA,
    SOURCE: ADDITION_SOURCE,
    RESULT: ADDITION_RESULT
};
exports.default = SUM;
//# sourceMappingURL=addition.js.map