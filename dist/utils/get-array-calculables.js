"use strict";
/**
 * @module fxSolve/utils/get-array-calculables
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_calculable_1 = require("./is-calculable");
/**
 * Filters all the calculable elements of an array.
 * @param {Object[]} arr The array where to find the calculables.
 * @returns {Object[]} The found calculables.
 */
function getArrayCalculables(arr) {
    const calculables = arr.filter((attr) => is_calculable_1.default(attr));
    return calculables;
}
exports.default = getArrayCalculables;
//# sourceMappingURL=get-array-calculables.js.map