import getRandomInt from './random-int';
import * as Chance from 'chance';
/**
 * Builds an array of random words that can be used as variables.
 * @param {Number} min The mini number of variables.
 * @param {Number} max The max number of variables.
 * @returns {String[]} An array of random variables
 */
export default function getVariables(min = 1, max = 10): string[] {
  const chance = new Chance();

  const vars: string[] = [];
  const varsLength = getRandomInt(min, max);
  for (let i = 1; i <= varsLength; i++) {
    const varName = chance.word();
    vars.push(varName);
  }

  return vars;
}
