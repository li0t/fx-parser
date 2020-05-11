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
const is_unexpected_type_error_1 = require("./is-unexpected-type-error");
const chai_1 = require("chai");
describe(`${is_unexpected_type_error_1.default.name}`, () => {
    it('Unexpected type evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
        const unexpectedTypeError = is_unexpected_type_error_1.default('Unexpected type');
        chai_1.expect(unexpectedTypeError).to.be.true;
    }));
    it('Cannot convert evaluates true', () => __awaiter(void 0, void 0, void 0, function* () {
        const unexpectedTypeError = is_unexpected_type_error_1.default('Cannot convert');
        chai_1.expect(unexpectedTypeError).to.be.true;
    }));
    it('Another error string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
        const unexpectedTypeError = is_unexpected_type_error_1.default('Another error string');
        chai_1.expect(unexpectedTypeError).to.be.false;
    }));
});
//# sourceMappingURL=is-unexpected-type-error.spec.js.map