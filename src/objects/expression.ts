import { BoolOperator, Operator } from 'src/types/operators';

export class Expression {
  constructor(expr: BoolOperator | Operator | string, expression) {
    this[expr] = expression;
  }
}
