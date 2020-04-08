/**
 * @module fxSolve/errors
 */
import { ErrorInterface } from './types';
declare class Error implements ErrorInterface {
    name: string;
    message: string;
    static captureStackTrace(object: any, objectConstructor?: any): any;
}
export declare class CustomError extends Error {
    constructor(message: string);
}
/** Errors */
export declare const InvalidFormulaError: (message: string) => void;
export declare const InvalidVariablesError: (message: string) => void;
export declare const InvalidValueError: (message: string) => void;
export declare const InvalidReferenceError: (message: string) => void;
export declare const InvalidArgumentsError: (message: string) => void;
declare const _default: {
    InvalidVariablesError: (message: string) => void;
    InvalidReferenceError: (message: string) => void;
    InvalidArgumentsError: (message: string) => void;
    InvalidFormulaError: (message: string) => void;
    InvalidValueError: (message: string) => void;
};
export default _default;
