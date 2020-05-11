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
const chai_1 = require("chai");
const SUM_VARIABLES = ['A', 'B'];
const SUM_FORMULA = {
    _id: Math.random().toString(),
    name: 'Sum',
    expression: `${SUM_VARIABLES[0]} + ${SUM_VARIABLES[1]}`,
    variables: SUM_VARIABLES
};
const formulas = [SUM_FORMULA];
const SUM_SOURCE = {
    _id: Math.random().toString(),
    name: 'SUM_SOURCE',
    [`${SUM_VARIABLES[0]}`]: Math.random(),
    [`${SUM_VARIABLES[1]}`]: Math.random()
};
const SUM_CALCULABLE = {
    formula: SUM_FORMULA._id,
    value: null,
    variables: [
        {
            name: SUM_VARIABLES[0],
            reference: {
                model: 'Source',
                docId: SUM_SOURCE._id,
                path: SUM_VARIABLES[0]
            }
        },
        {
            name: SUM_VARIABLES[1],
            reference: {
                model: 'Source',
                docId: SUM_SOURCE._id,
                path: SUM_VARIABLES[1]
            }
        }
    ]
};
const ctx = {
    formulas
};
ctx['Source'] = [SUM_SOURCE];
describe(`${solve_formula_1.default.name}`, () => {
    describe(`${SUM_FORMULA.name}`, () => {
        it('Solved expression equals to sum', () => __awaiter(void 0, void 0, void 0, function* () {
            const SUM_VARIABLES_0 = SUM_SOURCE[SUM_VARIABLES[0]];
            const SUM_VARIABLES_1 = SUM_SOURCE[SUM_VARIABLES[1]];
            const SUM_RESULT = SUM_VARIABLES_0 + SUM_VARIABLES_1;
            const sum = solve_formula_1.default(SUM_CALCULABLE, ctx);
            chai_1.expect(sum).to.equals(SUM_RESULT);
        }));
    });
});
//# sourceMappingURL=solve-formula.spec.js.map