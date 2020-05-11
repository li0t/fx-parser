"use strict";
/**
 * @module fxSolve/utils/service/
 */
Object.defineProperty(exports, "__esModule", { value: true });
const find_document_1 = require("./find-document");
const _ = require("lodash");
const is = require("fi-is");
const errors_1 = require("../errors");
/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
function findValue(variable, ctx) {
    if (!is.object(ctx)) {
        throw new errors_1.InvalidVariablesError('Context must be an object');
    }
    if (!is.object(variable)) {
        throw new errors_1.InvalidVariablesError('Variable must be an object');
    }
    const reference = variable.reference;
    if (!is.object(reference)) {
        throw new errors_1.InvalidVariablesError('Reference must be an object');
    }
    if (!is.string(reference.path) || is.empty(reference.path)) {
        throw new errors_1.InvalidReferenceError('Reference path must be a string');
    }
    const doc = find_document_1.default(reference, ctx);
    const found = _.get(doc, reference.path);
    if (found === null || found === undefined) {
        throw new errors_1.InvalidReferenceError(`Value was not found in ${reference.path}`);
    }
    if (is.object(found)) {
        return found.value;
    }
    return found;
}
exports.default = findValue;
//# sourceMappingURL=find-value.js.map