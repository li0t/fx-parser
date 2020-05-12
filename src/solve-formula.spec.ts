import solveFormula from './solve-formula';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import { ADDITION, SUBTRACTION, MULTIPLICATION, ctx } from './formula_generator';

describe('Solve formulas', () => {
  describe('Arithmetic', () => {
    describe('Addition', () => {
      it(`Should be ${ADDITION.RESULT}`, async () => {
        const res = solveFormula(ADDITION.CALCULABLE, ctx);
        expect(res).to.equals(ADDITION.RESULT);
      });
    });

    describe('Subtraction', () => {
      it(`Should be ${SUBTRACTION.RESULT}`, async () => {
        const res = solveFormula(SUBTRACTION.CALCULABLE, ctx);
        expect(res).to.equals(SUBTRACTION.RESULT);
      });
    });

    describe('Multiplication', () => {
      it(`Should be ${MULTIPLICATION.RESULT}`, async () => {
        const res = solveFormula(MULTIPLICATION.CALCULABLE, ctx);
        expect(res).to.equals(MULTIPLICATION.RESULT);
      });
    });
  });
});
