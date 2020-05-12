import ADDITION from './addition';
import SUBTRACTION from './subtraction';

import { Context } from '../interfaces';

export const formulas = [ADDITION.FORMULA, SUBTRACTION.FORMULA];

export const sources = [ADDITION.SOURCE, SUBTRACTION.SOURCE];

export const ctx: Context = {
  formulas
};

ctx['Source'] = sources;

export { ADDITION, SUBTRACTION };
