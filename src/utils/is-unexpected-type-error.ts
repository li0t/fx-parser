/**
 * @module fxSolve/utils/service/is-unexpected-type-error
 */

/**
 * Mathjs returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 */
export default function isUnexpectedTypeError(err: string): boolean {
  return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}
