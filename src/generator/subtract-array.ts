/**
 * Subtracts all the values.
 * @param {Number} accumulator The accumulated value
 * @param {Number} currentValue The current value.
 * @returns {Number} The subtracted value
 */
function reducer(accumulator: number, currentValue: number): number {
  return accumulator - currentValue;
}

/**
 * Subtracts all values of an array
 * @param {Number[]} arr The array to sum
 * @returns {Number} The subtracted value.  
 */
export default function subtractArray(arr: number[]): number {
  return arr.reduce(reducer);
}
