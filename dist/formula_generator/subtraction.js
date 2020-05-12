"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_variables_references_1 = require("./get-variables-references");
const get_variables_values_1 = require("./get-variables-values");
const get_variables_1 = require("./get-variables");
const get_object_id_1 = require("./get-object-id");
const subtract_array_1 = require("./subtract-array");
const formulaId = get_object_id_1.default();
const sourceId = get_object_id_1.default();
const variables = get_variables_1.default(2, 10);
const variablesValues = get_variables_values_1.default(variables);
const variablesReferences = get_variables_references_1.default(variables, 'Source', sourceId);
const expression = variables.join(' - ');
// Formula
const SUBTRACT_FORMULA = {
    expression,
    variables,
    _id: formulaId,
    name: 'SUBTRACT'
};
// Source
const SUBTRACT_SOURCE = Object.assign({ _id: sourceId, name: 'SUBTRACT_SOURCE' }, variablesValues);
// Calculables
const SUBTRACT_CALCULABLE = {
    formula: SUBTRACT_FORMULA._id,
    value: null,
    variables: variablesReferences
};
// Result
const SUBTRACT_RESULT = subtract_array_1.default(Object.values(variablesValues));
const SUBTRACT = {
    CALCULABLE: SUBTRACT_CALCULABLE,
    FORMULA: SUBTRACT_FORMULA,
    SOURCE: SUBTRACT_SOURCE,
    RESULT: SUBTRACT_RESULT
};
exports.default = SUBTRACT;
//# sourceMappingURL=subtraction.js.map