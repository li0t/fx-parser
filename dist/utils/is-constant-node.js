"use strict";
/**
 * @module fxSolve/utils/is-constant-node
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if expression node represents a constant.
 * @param {Object} node The node to check.
 * @returns {Boolean} Is the node a constant.
 */
function isConstantNode(node) {
    return node.classes.includes('math-number');
}
exports.default = isConstantNode;
//# sourceMappingURL=is-constant-node.js.map