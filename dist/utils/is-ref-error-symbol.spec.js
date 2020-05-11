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
const is_ref_error_symbol_1 = require("./is-ref-error-symbol");
const consts_1 = require("../consts");
const chai_1 = require("chai");
describe(`${is_ref_error_symbol_1.default.name}`, () => {
    it('Ref sybmol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
        const isRefSybmol = is_ref_error_symbol_1.default(consts_1.REF_ERROR);
        chai_1.expect(isRefSybmol).to.be.true;
    }));
    it('Another string evalutes false', () => __awaiter(void 0, void 0, void 0, function* () {
        const isNotRefSybmol = is_ref_error_symbol_1.default('watevaveva');
        chai_1.expect(isNotRefSybmol).to.be.false;
    }));
});
//# sourceMappingURL=is-ref-error-symbol.spec.js.map