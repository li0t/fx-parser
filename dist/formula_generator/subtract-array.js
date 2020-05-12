"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Subtracts all the values.
 * @param {Number} accumulator The accumulated value
 * @param {Number} currentValue The current value.
 * @returns {Number} The subtracted value
 */
function reducer(accumulator, currentValue) {
    return accumulator - currentValue;
}
/**
 * Subtracts all values of an array
 * @param {Number[]} arr The array to sum
 * @returns {Number} The subtracted value.
 */
function subtractArray(arr) {
    return arr.reduce(reducer);
}
exports.default = subtractArray;
//# sourceMappingURL=subtract-array.js.map