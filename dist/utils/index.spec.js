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
const FORMULAS_CONSTS = require("../consts");
require("mocha");
const chai_1 = require("chai");
const _1 = require(".");
describe('Utils', () => {
    describe(`${_1.isUndefinedVariableError.name}`, () => {
        it('Undefined symbol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
            const undefinedVariableError = _1.isUndefinedVariableError('Undefined symbol');
            chai_1.expect(undefinedVariableError).to.be.true;
        }));
        it('Another error string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
            const undefinedVariableError = _1.isUndefinedVariableError('Another error string');
            chai_1.expect(undefinedVariableError).to.be.false;
        }));
    });
    describe(`${_1.isUnexpectedTypeError.name}`, () => {
        it('Unexpected type evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
            const unexpectedTypeError = _1.isUnexpectedTypeError('Unexpected type');
            chai_1.expect(unexpectedTypeError).to.be.true;
        }));
        it('Cannot convert evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
            const unexpectedTypeError = _1.isUnexpectedTypeError('Cannot convert');
            chai_1.expect(unexpectedTypeError).to.be.true;
        }));
        it('Another error string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
            const unexpectedTypeError = _1.isUnexpectedTypeError('Another error string');
            chai_1.expect(unexpectedTypeError).to.be.false;
        }));
    });
    describe(`${_1.isFormulaSymbol.name}`, () => {
        it('Formula sybmol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
            const CONSTS_VALUES = Object.values(FORMULAS_CONSTS);
            const symbol = CONSTS_VALUES[CONSTS_VALUES.length - 1];
            const isFormulaSybmol = _1.isFormulaSymbol(symbol);
            chai_1.expect(isFormulaSybmol).to.be.true;
        }));
        it('Another string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
            const isNotFormulaSymbol = _1.isFormulaSymbol('wateva');
            chai_1.expect(isNotFormulaSymbol).to.be.false;
        }));
    });
    describe(`${_1.isRefErrorSymbol.name}`, () => {
        it('Ref sybmol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
            const isRefSybmol = _1.isRefErrorSymbol(FORMULAS_CONSTS.REF_ERROR);
            chai_1.expect(isRefSybmol).to.be.true;
        }));
        it('Another string evalutes false', () => __awaiter(void 0, void 0, void 0, function* () {
            const isNotRefSybmol = _1.isRefErrorSymbol('watevaveva');
            chai_1.expect(isNotRefSybmol).to.be.false;
        }));
    });
    describe(`${_1.isValErrorSymbol.name}`, () => {
        it('Val sybmol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
            const isValSybmol = _1.isValErrorSymbol(FORMULAS_CONSTS.VAL_ERROR);
            chai_1.expect(isValSybmol).to.be.true;
        }));
        it('Another string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
            const isValSybmol = _1.isValErrorSymbol('flux');
            chai_1.expect(isValSybmol).to.be.false;
        }));
    });
});
//# sourceMappingURL=index.spec.js.map