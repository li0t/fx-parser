"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Multiplies all the values.
 * @param {Number} accumulator The accumulated value
 * @param {Number} currentValue The current value.
 * @returns {Number} The multiplied value
 */
function reducer(accumulator, currentValue) {
    return accumulator * currentValue;
}
/**
 * Multiplies all values of an array
 * @param {Number[]} arr The array to multiply
 * @returns {Number} The multiplied value.
 */
function multiplyArray(arr) {
    return arr.reduce(reducer);
}
exports.default = multiplyArray;
//# sourceMappingURL=multiply-array.js.map