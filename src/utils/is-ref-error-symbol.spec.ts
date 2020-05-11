import isRefErrorSymbol from './is-ref-error-symbol';

import { REF_ERROR } from '../consts';
import { expect } from 'chai';

describe(`${isRefErrorSymbol.name}`, () => {
  it('Ref sybmol evaluates true', async () => {
    const isRefSybmol = isRefErrorSymbol(REF_ERROR);
    expect(isRefSybmol).to.be.true;
  });

  it('Another string evalutes false', async () => {
    const isNotRefSybmol = isRefErrorSymbol('watevaveva');
    expect(isNotRefSybmol).to.be.false;
  });
});
