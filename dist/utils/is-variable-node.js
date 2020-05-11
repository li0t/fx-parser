"use strict";
/**
 * @module fxSolve/utils/service/is-variable-node
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if node represents a variable.
 */
function isVariableNode(node) {
    return node.classes.includes('math-symbol');
}
exports.default = isVariableNode;
//# sourceMappingURL=is-variable-node.js.map