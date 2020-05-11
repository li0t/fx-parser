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
const is_formula_symbol_1 = require("./is-formula-symbol");
const FORMULAS_CONSTS = require("../consts");
const chai_1 = require("chai");
describe(`${is_formula_symbol_1.default.name}`, () => {
    it('Formula sybmol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
        const CONSTS_VALUES = Object.values(FORMULAS_CONSTS);
        const symbol = CONSTS_VALUES[CONSTS_VALUES.length - 1];
        const isFormulaSybmol = is_formula_symbol_1.default(symbol);
        chai_1.expect(isFormulaSybmol).to.be.true;
    }));
    it('Another string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
        const isNotFormulaSymbol = is_formula_symbol_1.default('wateva');
        chai_1.expect(isNotFormulaSymbol).to.be.false;
    }));
});
//# sourceMappingURL=is-formula-symbol.spec.js.map