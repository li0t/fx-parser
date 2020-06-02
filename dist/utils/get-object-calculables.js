"use strict";
/**
 * @module fxSolve/utils/get-object-calculables
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_array_calculables_1 = require("./get-array-calculables");
/**
 * Filters all the calculable attributes of an object.
 * @param {Object} obj The object where to find the calculables.
 * @returns {Object[]} The found calculables.
 */
function getObjectCalculables(obj) {
    const values = Object.values(obj);
    const calculables = get_array_calculables_1.default(values);
    return calculables;
}
exports.default = getObjectCalculables;
//# sourceMappingURL=get-object-calculables.js.map