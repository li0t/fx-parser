/**
 * Multiplies all the values.
 * @param {Number} accumulator The accumulated value
 * @param {Number} currentValue The current value.
 * @returns {Number} The multiplied value
 */
function reducer(accumulator: number, currentValue: number): number {
  return accumulator * currentValue;
}

/**
 * Multiplies all values of an array
 * @param {Number[]} arr The array to multiply
 * @returns {Number} The multiplied value.  
 */
export default function multiplyArray(arr: number[]): number {
  return arr.reduce(reducer);
}
