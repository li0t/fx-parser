import Variable from './variable';

export default interface Calculable {
  value: number | string;
  formula: string;
  variables: Variable[];
}
