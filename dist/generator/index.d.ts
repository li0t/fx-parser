import ADDITION from './addition';
import SUBTRACTION from './subtraction';
import MULTIPLICATION from './multiplication';
import { Context } from '../interfaces';
export declare const formulas: {
    expression: string;
    variables: string[];
    _id: string;
    name: string;
}[];
export declare const sources: {
    _id: string;
    name: string;
}[];
export declare const ctx: Context;
export { ADDITION, SUBTRACTION, MULTIPLICATION };
