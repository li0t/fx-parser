import { isUndefinedVariableError } from './utils';
import { expect } from 'chai';
import 'mocha';

describe('Utils', () => {
  describe('isUndefinedVariableError', () => {
    it('Undefined symbol evaluates', async () => {
      const undefinedVariableError = isUndefinedVariableError('Undefined symbol');
      expect(undefinedVariableError).to.be.true;
    });


    it('Another error string evaluates false', async () => {
      const undefinedVariableError = isUndefinedVariableError('Another error string');
      expect(undefinedVariableError).to.be.false;
    });
  });
});
