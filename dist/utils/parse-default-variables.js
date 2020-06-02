"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_default_reference_1 = require("./parse-default-reference");
const fi_is_1 = require("fi-is");
/**
 * Builds an array of variables, parsing the defaul references paths.
 * @param {String} docId The docId to assign to the variables.
 * @param {String} model The model to assign to the variables.
 * @param {String} attributePath The attribute path to be replaces in the references
 * @param {Object[]} defaultVariables The default variables array.
 * @returns {Object[]} The parsed variables.
 */
function parseDefaultVariables(docId, model, attributePath, defaultVariables) {
    if (!fi_is_1.default.string(docId)) {
        throw new Error(`Invalid docId "${docId}"`);
    }
    if (!fi_is_1.default.string(model)) {
        throw new Error(`Invalid model "${model}"`);
    }
    if (!fi_is_1.default.string(attributePath)) {
        throw new Error(`Invalid attributePath "${attributePath}"`);
    }
    if (!fi_is_1.default.array(defaultVariables)) {
        throw new Error(`Invalid defaultVariables "${JSON.stringify(defaultVariables)}"`);
    }
    const newVariables = defaultVariables.map((variable) => {
        if (!fi_is_1.default.object(variable)) {
            throw new Error(`Invalid variable "${variable}"`);
        }
        const path = parse_default_reference_1.default(attributePath, variable.reference);
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
exports.default = parseDefaultVariables;
//# sourceMappingURL=parse-default-variables.js.map