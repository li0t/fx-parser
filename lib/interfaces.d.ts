/**
 * @types fxSolve/interfaces
 */

import { calculationResult } from './types';

export interface NodeAttribute {
  name: string;
  value: any;
}

export interface Node {
  value: any;
  classes: string[];
  attrs: NodeAttribute[];
  childNodes: Node[];
}

export interface Reference {
  _id: string;
  model: string;
  path: string;
}

export interface Variable {
  name: string;
  reference: Reference;
}

export interface Calculable {
  value: calculationResult;
  formula: string;
  variables: Variable[];
}

export interface Formula {
  name: string;
  expression: string;
  variables: string[];
}
