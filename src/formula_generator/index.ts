import ADDITION from './addition';
import SUBTRACTION from './subtraction';
import MULTIPLICATION from './multiplication';

import { Context } from '../interfaces';

export const formulas = [ADDITION.FORMULA, SUBTRACTION.FORMULA, MULTIPLICATION.FORMULA];

export const sources = [ADDITION.SOURCE, SUBTRACTION.SOURCE, MULTIPLICATION.SOURCE];

export const ctx: Context = {
  formulas
};

ctx['Source'] = sources;

export { ADDITION, SUBTRACTION, MULTIPLICATION };
