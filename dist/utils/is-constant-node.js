"use strict";
/**
 * @module fxSolve/utils/service/is-constant-node
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if node represents a constant.
 */
function isConstantNode(node) {
    return node.classes.includes('math-number');
}
exports.default = isConstantNode;
//# sourceMappingURL=is-constant-node.js.map