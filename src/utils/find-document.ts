/**
 * @module fxSolve/utils/find-document
 */

import compareIds from './compare-ids';
import * as is from 'fi-is';

import { Reference, Context, ContextModel, ModelDocument } from '../interfaces';
import { InvalidReferenceError, InvalidVariablesError } from '../errors';

/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
export default function findDocument(reference: Reference, ctx: Context): ModelDocument {
  if (!is.object(ctx)) {
    throw new InvalidVariablesError('Ctx must be an object');
  }

  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference.model)) {
    throw new InvalidVariablesError('Reference model must be a string');
  }

  if (is.empty(reference.docId)) {
    throw new InvalidVariablesError("Reference docId can't be empty");
  }

  const model: ContextModel = ctx[reference.model];

  if (!is.array(model) || is.empty(model)) {
    throw new InvalidVariablesError(`Invalid context model "${reference.model}"`);
  }

  const doc = model.find((doc) => compareIds(doc._id, reference.docId));

  if (!is.object(doc)) {
    throw new InvalidReferenceError(`Document ${reference.docId} was not found in context model ${reference.model}`);
  }

  return doc;
}
