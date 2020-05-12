"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sums all the values.
 * @param {Number} accumulator The accumulated value
 * @param {Number} currentValue The current value.
 * @returns {Number} The summed value
 */
function reducer(accumulator, currentValue) {
    return accumulator + currentValue;
}
/**
 * Sums all values of an array
 * @param {Number[]} arr The array to sum
 * @returns {Number} The summed value.
 */
function sumArray(arr) {
    return arr.reduce(reducer);
}
exports.default = sumArray;
//# sourceMappingURL=sum-array.js.map