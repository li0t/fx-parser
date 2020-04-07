/**
 * @module fxSolve/utils
 */
import { Node } from './interfaces';
/**
 * Library returns anonymous error with the "Undefined symbol" string.
 */
export declare function isUndefinedVariableError(err: string): boolean;
/**
 * Library returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 */
export declare function isUnexpectedTypeError(err: string): boolean;
/**
 * Checks if a string represents a component custom symbol.
 */
export declare function isFormulaSymbol(val: string): boolean;
/**
 * Checks if given value is a missing reference symbol
 */
export declare function isRefErrorSymbol(val: string): boolean;
/**
 * Checks if given value is a missing reference symbol
 */
export declare function isValErrorSymbol(val: string): boolean;
/**
 * Checks if node represents a variable.
 */
export declare function isVariableNode(node: Node): boolean;
/**
 * Checks if node represents a constant.
 */
export declare function isConstantNode(node: Node): boolean;
/**
 * Returns a formatted node
 */
export declare function parseExpressionNode(node: Node): Node;
/**
 * Returns an expression parsed as an html nodes tree.
 */
export declare function splitExpressionNodes(expression: string): Node[];
/**
 * Replaces commas on constants for periods, for a given expression.
 */
export declare function cleanExpression(expression: any): string;
/**
 * Parses a math expression string and returns an array with its variables names
 */
export declare function getVariables(expression: string): object[];
