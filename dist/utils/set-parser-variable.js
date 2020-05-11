"use strict";
/**
 * @module fxSolve/utils/service/set-parser-variable
 */
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_parser_val_1 = require("./is-valid-parser-val");
const errors_1 = require("../errors");
/**
 * Sets a variable value in a calculable parser.
 * @param  {Parser} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
function setParserVariable(parser, name, val) {
    if (!is_valid_parser_val_1.default(val)) {
        throw new errors_1.InvalidValueError(`Value ${val} is not a valid parser value`);
    }
    parser.set(name, val);
}
exports.default = setParserVariable;
//# sourceMappingURL=set-parser-variable.js.map