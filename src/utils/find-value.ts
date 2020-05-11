/**
 * @module fxSolve/utils/service/
 */

import findDocument from './find-document';
import * as _ from 'lodash';
import * as is from 'fi-is';

import { InvalidReferenceError, InvalidVariablesError } from '../errors';
import { Variable, Context } from '../interfaces';
import { FormulaResult } from '../types';



/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
export default function findValue(variable: Variable, ctx: Context): FormulaResult {
  if (!is.object(ctx)) {
    throw new InvalidVariablesError('Context must be an object');
  }

  if (!is.object(variable)) {
    throw new InvalidVariablesError('Variable must be an object');
  }

  const reference = variable.reference;

  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference.path) || is.empty(reference.path)) {
    throw new InvalidReferenceError('Reference path must be a string');
  }

  const doc = findDocument(reference, ctx);

  const found = _.get(doc, reference.path);

  if (found === null || found === undefined) {
    throw new InvalidReferenceError(`Value was not found in ${reference.path}`);
  }

  if (is.object(found)) {
    return found.value;
  }

  return found;
}
