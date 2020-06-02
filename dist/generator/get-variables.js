"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_int_1 = require("./random-int");
const Chance = require("chance");
/**
 * Builds an array of random words that can be used as variables.
 * @param {Number} min The mini number of variables.
 * @param {Number} max The max number of variables.
 * @returns {String[]} An array of random variables
 */
function getVariables(min = 1, max = 10) {
    const chance = new Chance();
    const vars = [];
    const varsLength = random_int_1.default(min, max);
    for (let i = 1; i <= varsLength; i++) {
        const varName = chance.word();
        vars.push(varName);
    }
    return vars;
}
exports.default = getVariables;
//# sourceMappingURL=get-variables.js.map