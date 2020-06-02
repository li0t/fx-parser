import { Calculable } from '../interfaces';
declare const SUM: {
    CALCULABLE: Calculable;
    FORMULA: {
        expression: string;
        variables: string[];
        _id: string;
        name: string;
    };
    SOURCE: {
        _id: string;
        name: string;
    };
    RESULT: number;
};
export default SUM;
