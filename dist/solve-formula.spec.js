"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const solve_formula_1 = require("./solve-formula");
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const generator_1 = require("./generator");
mocha_1.describe('Solve formulas', () => {
    mocha_1.describe('Arithmetic', () => {
        mocha_1.describe('Addition', () => {
            mocha_1.it(`Should be ${generator_1.ADDITION.RESULT}`, () => __awaiter(void 0, void 0, void 0, function* () {
                const res = solve_formula_1.default(generator_1.ADDITION.CALCULABLE, generator_1.ctx);
                chai_1.expect(res).to.equals(generator_1.ADDITION.RESULT);
            }));
        });
        mocha_1.describe('Subtraction', () => {
            mocha_1.it(`Should be ${generator_1.SUBTRACTION.RESULT}`, () => __awaiter(void 0, void 0, void 0, function* () {
                const res = solve_formula_1.default(generator_1.SUBTRACTION.CALCULABLE, generator_1.ctx);
                chai_1.expect(res).to.equals(generator_1.SUBTRACTION.RESULT);
            }));
        });
        mocha_1.describe('Multiplication', () => {
            mocha_1.it(`Should be ${generator_1.MULTIPLICATION.RESULT}`, () => __awaiter(void 0, void 0, void 0, function* () {
                const res = solve_formula_1.default(generator_1.MULTIPLICATION.CALCULABLE, generator_1.ctx);
                chai_1.expect(res).to.equals(generator_1.MULTIPLICATION.RESULT);
            }));
        });
    });
});
//# sourceMappingURL=solve-formula.spec.js.map