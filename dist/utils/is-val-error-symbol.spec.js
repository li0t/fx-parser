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
const is_val_error_symbol_1 = require("./is-val-error-symbol");
const consts_1 = require("../consts");
const chai_1 = require("chai");
describe(`${is_val_error_symbol_1.default.name}`, () => {
    it('Val sybmol evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
        const isValSybmol = is_val_error_symbol_1.default(consts_1.VAL_ERROR);
        chai_1.expect(isValSybmol).to.be.true;
    }));
    it('Another string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
        const isValSybmol = is_val_error_symbol_1.default('flux');
        chai_1.expect(isValSybmol).to.be.false;
    }));
});
//# sourceMappingURL=is-val-error-symbol.spec.js.map