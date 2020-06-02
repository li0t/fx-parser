"use strict";
/**
 * @module fxSolve/utils/split-expression-nodes
 */
Object.defineProperty(exports, "__esModule", { value: true });
const parse_expression_node_1 = require("./parse-expression-node");
const clean_expression_1 = require("./clean-expression");
const parse5 = require("parse5");
const math = require("mathjs");
/**
 * Parses a MathJs expression as an HTML nodes array.
 * @param {String} expression The expression to parse.
 * @returns {Object[]} The HTML nodes array.
 */
function splitExpressionNodes(expression) {
    const exp = clean_expression_1.default(expression);
    const nodesString = math.parse(exp).toHTML();
    const rootNode = parse5.parseFragment(nodesString);
    return rootNode.childNodes.map(parse_expression_node_1.default);
}
exports.default = splitExpressionNodes;
//# sourceMappingURL=split-expression-nodes.js.map