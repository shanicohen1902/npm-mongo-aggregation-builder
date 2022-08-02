import { Operator } from 'src/types/operators';

export class Comparison {
  constructor(operator: Operator, expr1, expr2) {
    this[operator] = [expr1, expr2];
  }
}
