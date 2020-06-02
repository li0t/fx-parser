"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chance = require("chance");
/**
 * Builds an object with variables and values.
 * @param {String[]} vars An array of strings
 * @param {Function} randomFn The function to generate variable values
 * @returns {Object} The result object.
 */
function getVariablesValues(vars, randomFn) {
    const chance = new Chance();
    const res = {};
    for (const varName of vars) {
        res[varName] = randomFn ? randomFn() : chance.floating();
    }
    return res;
}
exports.default = getVariablesValues;
//# sourceMappingURL=get-variables-values.js.map