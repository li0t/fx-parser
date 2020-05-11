"use strict";
/**
 * @module fxSolve/utils/service/get-array-calculables
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_calculable_1 = require("./is-calculable");
/**
 * Filters all the calculable elements of an array.
 * @param  {Object[]} arr
 * @returns Calculables array
 */
function getArrayCalculables(arr) {
    const calculables = arr.filter((attr) => is_calculable_1.default(attr));
    return calculables;
}
exports.default = getArrayCalculables;
//# sourceMappingURL=get-array-calculables.js.map