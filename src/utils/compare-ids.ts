/**
 * @module fxSolve/utils/compare-ids
 */

import * as is from 'fi-is';

/**
 * Compares two ids enforcing them to be strings
 * @param {string|object|null} id1 The first id.
 * @param {string|object|null} id2 The second id.
 * @returns {Boolean} Do the ids are the same.
 */
export default function compareIds(id1: string | object | null, id2: string | object | null): boolean {
  if (is.empty(id1) || is.empty(id2)) {
    throw new Error('Invalid ids to compare');
  }

  const a = id1.toString ? id1.toString() : id1;

  const b = id2.toString ? id2.toString() : id2;

  return a === b;
}
