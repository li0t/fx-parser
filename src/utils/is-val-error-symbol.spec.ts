import isValErrorSymbol from './is-val-error-symbol';

import { VAL_ERROR } from '../consts';
import { expect } from 'chai';

describe(`${isValErrorSymbol.name}`, () => {
  it('Val sybmol evaluates true', async () => {
    const isValSybmol = isValErrorSymbol(VAL_ERROR);
    expect(isValSybmol).to.be.true;
  });

  it('Another string evaluates false', async () => {
    const isValSybmol = isValErrorSymbol('flux');
    expect(isValSybmol).to.be.false;
  });
});
