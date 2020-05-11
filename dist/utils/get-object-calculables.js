"use strict";
/**
 * @module fxSolve/utils/service/get-object-calculables
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_array_calculables_1 = require("./get-array-calculables");
/**
 * Filters all the calculable attributes of an object.
 * @param  {any} obj
 * @returns Calculables array
 */
function getObjectCalculables(obj) {
    const values = Object.values(obj);
    const calculables = get_array_calculables_1.default(values);
    return calculables;
}
exports.default = getObjectCalculables;
//# sourceMappingURL=get-object-calculables.js.map