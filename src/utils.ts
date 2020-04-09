/**
 * @module fxSolve/utils
 */

import * as FORMULAS_CONSTS from './consts';
import * as parse5 from 'parse5';
import * as math from 'mathjs';
import * as is from 'fi-is';

import { _get } from 'lodash.get';

const MATH_CONSTANTS = Object.keys(math);

import { Reference, Variable, Calculable, Formula, Context, ContextModel, ModelDocument, Parser } from './interfaces';
import { Node } from './interfaces';
import { InvalidReferenceError, InvalidValueError, InvalidVariablesError } from './errors';
import { FormulaResult } from './types';

/**
 * Library returns anonymous error with the "Undefined symbol" string.
 */
export function isUndefinedVariableError(err: string): boolean {
  return /Undefined symbol/.test(err);
}

/**
 * Library returns anonymous error with the "Unexpected type (...)" or "Cannot convert (...)" strings.
 */
export function isUnexpectedTypeError(err: string): boolean {
  return /Unexpected type/.test(err) || /Cannot convert/.test(err);
}

/**
 * Checks if a string represents a component custom symbol.
 */
export function isFormulaSymbol(val: string): boolean {
  return !!Object.values(FORMULAS_CONSTS).find((symbol) => val === symbol);
}

/**
 * Checks if given value is a missing reference symbol
 */
export function isRefErrorSymbol(val: string): boolean {
  const re = new RegExp(FORMULAS_CONSTS.REF_ERROR);
  return re.test(val);
}

/**
 * Checks if given value is a missing reference symbol
 */
export function isValErrorSymbol(val: string): boolean {
  const re = new RegExp(FORMULAS_CONSTS.VAL_ERROR);
  return re.test(val);
}

/**
 * Checks if node represents a variable.
 */
export function isVariableNode(node: Node) {
  return node.classes.includes('math-symbol');
}

/**
 * Checks if node represents a constant.
 */
export function isConstantNode(node: Node) {
  return node.classes.includes('math-number');
}

/**
 * Returns a formatted node
 */
export function parseExpressionNode(node: Node): Node {
  const newNode: Node = {
    classes: node.attrs.find((attr) => attr.name === 'class').value,
    value: node.childNodes[0].value,
    childNodes: [],
    attrs: []
  };

  if (isConstantNode(newNode)) {
    newNode.value = newNode.value.replace(/\./, ',');
  }

  return newNode;
}

/**
 * Returns an expression parsed as an html nodes tree.
 */
export function splitExpressionNodes(expression: string): Node[] {
  const exp = cleanExpression(expression);

  const nodesString = math.parse(exp).toHTML();

  const rootNode = parse5.parseFragment(nodesString);

  return rootNode.childNodes.map(parseExpressionNode);
}

/**
 * Replaces commas on constants for periods, for a given expression.
 */
export function cleanExpression(expression): string {
  const match = /\d,\d/.exec(expression);

  if (!match) {
    return expression;
  }

  const fixed = match.toString().replace(/,/g, '.');

  const newExp = expression.replace(match, fixed);

  return cleanExpression(newExp);
}

/**
 * Parses a math expression string and returns an array with its variables names
 */
export function getVariables(expression: string): string[] {
  const variables = [];

  const exp = cleanExpression(expression);

  const node = math.parse(exp);

  node.traverse((n) => {
    if (n.type === 'SymbolNode' && !MATH_CONSTANTS.includes(n.name)) {
      const alreadyAdded = variables.find((v) => v === n.name);

      if (!alreadyAdded) {
        variables.push(n.name);
      }
    }
  });

  return variables;
}

/**
 * Compares two ids enforcing them to be strings
 * @param  {string|object|null} id1
 * @param  {string|object|null} id2
 * @returns boolean
 */
export function compareIds(id1: string | object | null, id2: string | object | null): boolean {
  if (is.empty(id1) || is.empty(id2)) {
    throw new Error('Invalid ids to compare');
  }

  const a = id1.toString ? id1.toString() : id1;

  const b = id2.toString ? id2.toString() : id2;

  return a === b;
}

/**
 * Checks if a given value is acceptable to be set as parser variable.
 * @param  {any} val
 * @returns boolean
 */
export function isValidParserVal(val: any): boolean {
  return !is.empty(val) && !isRefErrorSymbol(val) && !isValErrorSymbol(val);
}

/**
 * Checks if an attribute is an object and has a formula
 * @param  {Calculable} attribute
 * @returns boolean
 */
export function isCalculable(attribute: Calculable): boolean {
  return is.object(attribute) && !is.empty(attribute.formula);
}

/**
 * Filters all the calculable attributes of an object.
 * @param  {any} source
 * @returns Calculable
 */
export function getSourceCalculables(source: any): Calculable[] {
  return <Calculable[]>Object.values(source).filter((attr: Calculable) => isCalculable(attr));
}

/**
 * Returns a fxSolve consts for a known error.
 * @param  {Error|string} err
 * @returns string
 */
export function handleCalcError(err: Error | string): string {
  if (err instanceof InvalidReferenceError) {
    return FORMULAS_CONSTS.REF_ERROR;
  }

  if (err instanceof InvalidValueError || isUnexpectedTypeError(<string>err)) {
    return FORMULAS_CONSTS.VAL_ERROR;
  }

  throw err;
}

/**
 * Tries to solve a mathematical expression.
 * @param  {string} expression
 * @param  {Parser} parser
 * @returns FormulaResult
 */
export function solveExpression(expression: string, parser: Parser): FormulaResult {
  try {
    const cleaned = cleanExpression(expression);

    return parser.eval(cleaned);
  } catch (err) {
    if (isUndefinedVariableError(err)) {
      return;
    }

    throw err;
  }
}

/**
 * Sets a variable value in a calculable parser.
 * @param  {Parser} parser
 * @param  {string} name
 * @param  {any} val
 * @returns void
 */
export function setParserVariable(parser: Parser, name: string, val: any): void {
  if (!isValidParserVal(val)) {
    throw new InvalidValueError(`Value ${val} is not a valid parser value`);
  }

  parser.set(name, val);
}

/**
 * Finds a model document in the context.
 * @param  {Reference} reference
 * @param  {Context} ctx
 * @returns The model document
 */
export function findDocument(reference: Reference, ctx: Context): ModelDocument {
  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference.docId)) {
    throw new InvalidVariablesError('Refernce docId must be a string');
  }

  if (!is.string(reference.model)) {
    throw new InvalidVariablesError('Refernce model must be a string');
  }

  if (!is.object(ctx)) {
    throw new InvalidVariablesError('Ctx must be an object');
  }

  const model: ContextModel = ctx[reference.model];

  if (!is.array(model) || is.empty(model)) {
    throw new InvalidVariablesError(`Invalid context model "${reference.model}"`);
  }

  const doc = model.find((doc) => compareIds(doc._id, reference.docId));

  if (!is.object(doc)) {
    throw new InvalidReferenceError(`Document ${reference.docId} was not found in context model ${reference.model}`);
  }

  return doc;
}

/**
 * Retrieves the references value.
 * @param  {Variable} variable
 * @param  {Context} ctx
 * @returns FormulaResult
 */
export function findValue(variable: Variable, ctx: Context): FormulaResult {
  if (!is.object(variable)) {
    throw new InvalidVariablesError('Variable must be an object');
  }

  const reference = variable.reference;

  if (!is.object(reference)) {
    throw new InvalidVariablesError('Reference must be an object');
  }

  if (!is.string(reference.path)) {
    throw new InvalidVariablesError('Refernce path must be a string');
  }

  if (!is.object(ctx)) {
    throw new InvalidReferenceError('Context must be an object');
  }

  const doc = findDocument(reference, ctx);

  const found = _get(doc, reference.path);

  if (found === null || found === undefined) {
    throw new InvalidReferenceError('Invalid fetched value');
  }

  if (is.object(found)) {
    found.value;
  }

  return found;
}

/**
 * Looks for a formula object in the store formulas array.
 * @param  {Context} ctx
 * @param  {any} formula
 * @returns Formula
 */
export function findFormula(ctx: Context, formula: any): Formula {
  const formulaId = formula._id || formula;

  if (is.empty(formula)) throw new Error('Invalid formula');

  return ctx.formulas.find((f) => compareIds(f._id, formulaId));
}
