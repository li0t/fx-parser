import SUM from './sum';

import { Context } from '../interfaces';

export const formulas = [SUM.FORMULA];
export const sources = [SUM.SOURCE];

export const ctx: Context = {
  formulas
};

ctx['Source'] = sources;

export { SUM };
