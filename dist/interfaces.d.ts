/**
 * @types fxSolve/interfaces
 */
import { FormulaResult } from './types';
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
    docId: string;
    model: string;
    path: string;
}
export interface Variable {
    name: string;
    reference: Reference;
}
export interface Calculable {
    value: FormulaResult;
    formula: string;
    variables: Variable[];
}
export interface Formula {
    _id: string;
    name: string;
    expression: string;
    variables: string[];
}
export interface ModelDocument {
    _id: string;
    formulas: Formula[];
}
export interface ContextModel extends Array<ModelDocument> {
}
export interface Context {
    formulas: Formula[];
}
export interface Parser {
    eval: Function;
    set: Function;
}
