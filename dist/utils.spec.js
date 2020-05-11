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
const utils_1 = require("./utils");
const chai_1 = require("chai");
require("mocha");
describe('Utils', () => {
    describe('isUndefinedVariableError', () => {
        it('Undefined symbol evaluates', () => __awaiter(void 0, void 0, void 0, function* () {
            const undefinedVariableError = utils_1.isUndefinedVariableError('Undefined symbol');
            chai_1.expect(undefinedVariableError).to.be.true;
        }));
        it('Another error string evaluates false', () => __awaiter(void 0, void 0, void 0, function* () {
            const undefinedVariableError = utils_1.isUndefinedVariableError('Another error string');
            chai_1.expect(undefinedVariableError).to.be.false;
        }));
    });
});
//# sourceMappingURL=utils.spec.js.map