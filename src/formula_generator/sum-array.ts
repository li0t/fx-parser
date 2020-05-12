/**
 * Sums all the values.
 * @param {Number} accumulator The accumulated value
 * @param {Number} currentValue The current value.
 * @returns {Number} The summed value
 */
function reducer(accumulator: number, currentValue: number): number {
  return accumulator + currentValue;
}

/**
 * Sums all values of an array
 * @param {Number[]} arr The array to sum
 * @returns {Number} The summed value.  
 */
export default function sumArray(arr: number[]): number {
  return arr.reduce(reducer);
}
