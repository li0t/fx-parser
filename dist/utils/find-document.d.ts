/**
 * @module fxSolve/utils/find-document
 */
import { Reference, Context, ModelDocument } from '../interfaces';
/**
 * Finds a model document in the context.
 * @param {Object} reference The reference to the document.
 * @param {Object} ctx The context where to find the document.
 * @returns {Object} The found document.
 */
export default function findDocument(reference: Reference, ctx: Context): ModelDocument;
