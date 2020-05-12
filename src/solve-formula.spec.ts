import solveFormula from './solve-formula';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { SUM, ctx } from './formula_generator';

describe('Solve formulas', () => {
  describe('Arithmetic', () => {
    describe('Summattion', () => {
      it('Solved expression equals to sum result', async () => {
        const sum = solveFormula(SUM.CALCULABLE, ctx);
        expect(sum).to.equals(SUM.RESULT);
      });
    });
  });
});
