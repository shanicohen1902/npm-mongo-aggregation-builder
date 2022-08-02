import { Expression } from 'src/objects/expression';

export class MatchBuilder {
  expression(expr: Expression) {
    return Object.assign(this, expr);
  }
}
