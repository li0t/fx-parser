/**
 * @module fxSolve/utils/service/is-formula-symbol1
 */

import * as FORMULAS_CONSTS from '../consts';

/**
 * Checks if a string represents a component custom symbol.
 */
export default function isFormulaSymbol(val: string): boolean {
  return !!Object.values(FORMULAS_CONSTS).find((symbol) => val === symbol);
}
