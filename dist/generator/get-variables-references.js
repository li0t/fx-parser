"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Builds an array of variables references.
 * @param {String[]} vars The array of variables names
 * @param {String} model The model to assign to each reference
 * @param {String} docId The docId to assign to each reference
 * @returns {Object[]} The variables references
 */
function getVariablesReferences(vars, model, docId) {
    const variables = [];
    for (const varName of vars) {
        const variable = {
            name: varName,
            reference: {
                model,
                docId,
                path: varName
            }
        };
        variables.push(variable);
    }
    return variables;
}
exports.default = getVariablesReferences;
//# sourceMappingURL=get-variables-references.js.map