/**
 * @module fxSolve/utils/service/is-undefined-variable-error
 */

/**
 * Mathjs returns anonymous error with the "Undefined symbol" string.
 */
export default function isUndefinedVariableError(err: string): boolean {
  return /Undefined symbol/.test(err);
}
