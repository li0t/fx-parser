"use strict";
/**
 * @module fxSolve/utils/is-variable-node
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if node represents an expression variable.
 * @param {Object} node The node to check.
 * @returns {Boolean} Is the node a variable.
 */
function isVariableNode(node) {
    return node.classes.includes('math-symbol');
}
exports.default = isVariableNode;
//# sourceMappingURL=is-variable-node.js.map