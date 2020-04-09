/**
 * @module fxSolve/utils
 */
import { Reference, Variable, Calculable, Formula, Context, ModelDocument, Parser } from './interfaces';
import { Node } from './interfaces';
import { FormulaResult } from './types';
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
export declare function getVariables(expression: string): string[];
/**
 * Compares two ids enforcing them to be strings
 * @param  {string|object|null} id1
 * @param  {string|object|null} id2
 * @returns boolean
 */
export declare function compareIds(id1: string | object | null, id2: string | object | null): boolean;
/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
export declare function isValidParserVal(val: any): boolean;
/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
export declare function isCalculable(attribute: Calculable): boolean;
/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculable
 */
export declare function getSourceCalculables(source: any): Calculable[];
/**
 * Returns a fxSolve consts for a known error.
 * @param  {Error|string} err
 * @returns string
 */
export declare function handleCalcError(err: Error | string): string;
/**
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {Parser} parser
 * @returns FormulaResult
 */
export declare function solveExpression(expression: string, parser: Parser): FormulaResult;
/**
 * Sets a variable value in a calculable parser.
 * @param  {Parser} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
export declare function setParserVariable(parser: Parser, name: string, val: any): void;
/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
export declare function findDocument(reference: Reference, ctx: Context): ModelDocument;
/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
export declare function findValue(variable: Variable, ctx: Context): FormulaResult;
/**
 * Looks for a formula object in the store formulas array.
 * @param  {Context} ctx
 * @param  {any} formula
 * @returns Formula
 */
export declare function findFormula(ctx: Context, formula: any): Formula;
