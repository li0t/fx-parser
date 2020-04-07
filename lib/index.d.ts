/**
 * @types fxSolve
 */

// Type definitions for fx-solve
// Project: https://github.com/li0t/fx-solve
// Definitions by: <li0t https://github.com/li0t>

import { Calculable } from './interfaces'
import { calculationResult } from "./types";

export function solveFormulas(source: any, ctx: any, parser: any) : void

export function solveFormula(calculable: Calculable, ctx: any, parser: any)  : calculationResult

export * as fxSolve from './index';

export default fxSolve