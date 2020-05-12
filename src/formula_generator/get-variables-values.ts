import * as Chance from 'chance';
/**
 * Builds an object with variables and values.
 * @param {String[]} vars An array of strings
 * @param {Function} randomFn The function to generate variable values
 * @returns {Object} The result object.
 */
export default function getVariablesValues(vars: string[], randomFn?: Function): object {
  const chance = new Chance();
  const res = {};

  for (const varName of vars) {
    res[varName] = randomFn ? randomFn() : chance.floating();
  }

  return res;
}
