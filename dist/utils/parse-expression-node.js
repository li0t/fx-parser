"use strict";
/**
 * @module fxSolve/utils/parse-expression-node
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_constant_node_1 = require("./is-constant-node");
/**
 * Parses a MathJs node to a HTML node format.
 * @param {Object} node The node to parse.
 * @returns {Object} The HTML node.
 */
function parseExpressionNode(node) {
    const newNode = {
        classes: node.attrs.find((attr) => attr.name === 'class').value,
        value: node.childNodes[0].value,
        childNodes: [],
        attrs: []
    };
    if (is_constant_node_1.default(newNode)) {
        newNode.value = newNode.value.replace(/\./, ',');
    }
    return newNode;
}
exports.default = parseExpressionNode;
//# sourceMappingURL=parse-expression-node.js.map