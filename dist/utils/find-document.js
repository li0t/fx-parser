"use strict";
/**
 * @module fxSolve/utils/service/find-document
 */
Object.defineProperty(exports, "__esModule", { value: true });
const compare_ids_1 = require("./compare-ids");
const is = require("fi-is");
const errors_1 = require("../errors");
/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
function findDocument(reference, ctx) {
    if (!is.object(ctx)) {
        throw new errors_1.InvalidVariablesError('Ctx must be an object');
    }
    if (!is.object(reference)) {
        throw new errors_1.InvalidVariablesError('Reference must be an object');
    }
    if (!is.string(reference.model)) {
        throw new errors_1.InvalidVariablesError('Reference model must be a string');
    }
    if (is.empty(reference.docId)) {
        throw new errors_1.InvalidVariablesError("Reference docId can't be empty");
    }
    const model = ctx[reference.model];
    if (!is.array(model) || is.empty(model)) {
        throw new errors_1.InvalidVariablesError(`Invalid context model "${reference.model}"`);
    }
    const doc = model.find((doc) => compare_ids_1.default(doc._id, reference.docId));
    if (!is.object(doc)) {
        throw new errors_1.InvalidReferenceError(`Document ${reference.docId} was not found in context model ${reference.model}`);
    }
    return doc;
}
exports.default = findDocument;
//# sourceMappingURL=find-document.js.map