/**
 * @module fxSolve/utils/service/find-document
 */
import { Reference, Context, ModelDocument } from '../interfaces';
/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
export default function findDocument(reference: Reference, ctx: Context): ModelDocument;
