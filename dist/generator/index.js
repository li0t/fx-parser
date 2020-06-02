"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addition_1 = require("./addition");
exports.ADDITION = addition_1.default;
const subtraction_1 = require("./subtraction");
exports.SUBTRACTION = subtraction_1.default;
const multiplication_1 = require("./multiplication");
exports.MULTIPLICATION = multiplication_1.default;
exports.formulas = [addition_1.default.FORMULA, subtraction_1.default.FORMULA, multiplication_1.default.FORMULA];
exports.sources = [addition_1.default.SOURCE, subtraction_1.default.SOURCE, multiplication_1.default.SOURCE];
exports.ctx = {
    formulas: exports.formulas
};
exports.ctx['Source'] = exports.sources;
//# sourceMappingURL=index.js.map