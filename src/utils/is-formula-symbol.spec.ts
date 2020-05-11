import isFormulaSymbol from './is-formula-symbol';
import * as FORMULAS_CONSTS from '../consts';

import { expect } from 'chai';

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
