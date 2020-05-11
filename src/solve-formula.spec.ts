import solveFormula from './solve-formula';

import { expect } from 'chai';
import { Calculable, Context } from './interfaces';

const SUM_VARIABLES = ['A', 'B'];

const SUM_FORMULA = {
  _id: Math.random().toString(),
  name: 'Sum',
  expression: `${SUM_VARIABLES[0]} + ${SUM_VARIABLES[1]}`,
  variables: SUM_VARIABLES
};

const formulas = [SUM_FORMULA];

const SUM_SOURCE = {
  _id: Math.random().toString(),
  name: 'SUM_SOURCE',
  [`${SUM_VARIABLES[0]}`]: Math.random(),
  [`${SUM_VARIABLES[1]}`]: Math.random()
};

const SUM_CALCULABLE: Calculable = {
  formula: SUM_FORMULA._id,
  value: null,
  variables: [
    {
      name: SUM_VARIABLES[0],
      reference: {
        model: 'Source',
        docId: SUM_SOURCE._id,
        path: SUM_VARIABLES[0]
      }
    },
    {
      name: SUM_VARIABLES[1],
      reference: {
        model: 'Source',
        docId: SUM_SOURCE._id,
        path: SUM_VARIABLES[1]
      }
    }
  ]
};

const ctx: Context = {
  formulas
};

ctx['Source'] = [SUM_SOURCE];

describe(`${solveFormula.name}`, () => {
  describe(`${SUM_FORMULA.name}`, () => {
    it('Solved expression equals to sum', async () => {
      const SUM_VARIABLES_0 = <number>SUM_SOURCE[SUM_VARIABLES[0]];
      const SUM_VARIABLES_1 = <number>SUM_SOURCE[SUM_VARIABLES[1]];
      const SUM_RESULT = SUM_VARIABLES_0 + SUM_VARIABLES_1;

      const sum = solveFormula(SUM_CALCULABLE, ctx);

      expect(sum).to.equals(SUM_RESULT);
    });
  });
});
