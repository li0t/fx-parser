import isUndefinedVariableError from './is-undefined-variable-error';

import { expect } from 'chai';

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
