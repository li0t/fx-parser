"use strict";
/**
 * @module fxSolve/utils/get-variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
const clean_expression_1 = require("./clean-expression");
const math = require("mathjs");
const MATH_CONSTANTS = Object.keys(math);
/**
 * Parses a math expression string and returns an array with its variables names.
 * @param {String} expression The formula expression.
 * @returns {String[]} An array of variables names.
 */
function getVariables(expression) {
    const variables = [];
    const exp = clean_expression_1.default(expression);
    const node = math.parse(exp);
    node.traverse((n) => {
        if (n.type === 'SymbolNode' && !MATH_CONSTANTS.includes(n.name)) {
            const alreadyAdded = variables.find((v) => v === n.name);
            if (!alreadyAdded) {
                variables.push(n.name);
            }
        }
    });
    return variables;
}
exports.default = getVariables;
//# sourceMappingURL=get-variables.js.map