import isUnexpectedTypeError from './is-unexpected-type-error';

import { expect } from 'chai';

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
