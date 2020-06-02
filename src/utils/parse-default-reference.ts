/**
 * @module fxSolve/utils/service//parse-default-reference
 */

/**
 * Checks if the reference has a path placeholder.
 * @param {String} reference The reference to check.
 * @returns {Boolean} Do the reference has a path placeholder.
 */
function hasDefaultPath(reference: string): boolean {
  return /\$THISPATH/gi.test(reference);
}

/**
 * Removes the last part of a dotted attribute path.
 * @param {String} attributePath The attribute path.
 * @returns {String} The reference prefix.
 */
function getReferencePrefix(attributePath: string): string {
  const attributePathArray = attributePath.split('.');

  attributePathArray.pop();

  const referencePrefix = attributePathArray.join('.');

  return referencePrefix;
}

/**
 * Removes the first part of reference with a default path.
 * @param {String} reference The reference.
 * @returns {String} The reference sufix.
 */
function getReferenceSufix(reference: string): string {
  const referenceAttributes = reference.split('.');

  if (referenceAttributes.length !== 2) {
    throw new Error(`Default reference ${reference} should have two parts`);
  }

  const referenceSufix = referenceAttributes[1];

  return referenceSufix;
}

/**
 * Replaces a default reference path with an attribute path.
 * @param {String} attributePath The attribute path.
 * @param {String} reference The reference.
 * @returns {String} The parsed reference.
 */
export default function parseDefaultReference(attributePath: string, reference: string): string {
  if (!hasDefaultPath(reference)) {
    return reference;
  }

  const referencePrefix = getReferencePrefix(attributePath);
  const referenceSufix = getReferenceSufix(reference);

  const newReference = `${referencePrefix}.${referenceSufix}`;

  return newReference;
}
