"use strict";
/**
 * @module fxSolve/utils/service/compare-ids
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is = require("fi-is");
/**
 * Compares two ids enforcing them to be strings
 * @param  {string|object|null} id1
 * @param  {string|object|null} id2
 * @returns boolean
 */
function compareIds(id1, id2) {
    if (is.empty(id1) || is.empty(id2)) {
        throw new Error('Invalid ids to compare');
    }
    const a = id1.toString ? id1.toString() : id1;
    const b = id2.toString ? id2.toString() : id2;
    return a === b;
}
exports.default = compareIds;
//# sourceMappingURL=compare-ids.js.map