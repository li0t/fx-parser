import * as FORMULAS_CONSTS from '../consts';
import 'mocha';

import { expect } from 'chai';
import {
  isUndefinedVariableError,
  isUnexpectedTypeError,
  isFormulaSymbol,
  isRefErrorSymbol,
  isValErrorSymbol
} from '.';

describe('Utils', () => {
  describe(`${isUndefinedVariableError.name}`, () => {
    it('Undefined symbol evaluates true', async () => {
      const undefinedVariableError = isUndefinedVariableError('Undefined symbol');
      expect(undefinedVariableError).to.be.true;
    });

    it('Another error string evaluates false', async () => {
      const undefinedVariableError = isUndefinedVariableError('Another error string');
      expect(undefinedVariableError).to.be.false;
    });
  });

  describe(`${isUnexpectedTypeError.name}`, () => {
    it('Unexpected type evaluates true', async () => {
      const unexpectedTypeError = isUnexpectedTypeError('Unexpected type');
      expect(unexpectedTypeError).to.be.true;
    });

    it('Cannot convert evaluates true', async () => {
      const unexpectedTypeError = isUnexpectedTypeError('Cannot convert');
      expect(unexpectedTypeError).to.be.true;
    });

    it('Another error string evaluates false', async () => {
      const unexpectedTypeError = isUnexpectedTypeError('Another error string');
      expect(unexpectedTypeError).to.be.false;
    });
  });

  describe(`${isFormulaSymbol.name}`, () => {
    it('Formula sybmol evaluates true', async () => {
      const CONSTS_VALUES = Object.values(FORMULAS_CONSTS);
      const symbol = CONSTS_VALUES[CONSTS_VALUES.length - 1];
      const isFormulaSybmol = isFormulaSymbol(symbol);
      expect(isFormulaSybmol).to.be.true;
    });

    it('Another string evaluates false', async () => {
      const isNotFormulaSymbol = isFormulaSymbol('wateva');
      expect(isNotFormulaSymbol).to.be.false;
    });
  });

  describe(`${isRefErrorSymbol.name}`, () => {
    it('Ref sybmol evaluates true', async () => {
      const isRefSybmol = isRefErrorSymbol(FORMULAS_CONSTS.REF_ERROR);
      expect(isRefSybmol).to.be.true;
    });

    it('Another string evalutes false', async () => {
      const isNotRefSybmol = isRefErrorSymbol('watevaveva');
      expect(isNotRefSybmol).to.be.false;
    });
  });
  describe(`${isValErrorSymbol.name}`, () => {
    it('Val sybmol evaluates true', async () => {
      const isValSybmol = isValErrorSymbol(FORMULAS_CONSTS.VAL_ERROR);
      expect(isValSybmol).to.be.true;
    });

    it('Another string evaluates false', async () => {
      const isValSybmol = isValErrorSymbol('flux');
      expect(isValSybmol).to.be.false;
    });
  });
});
