import { Expression } from 'src/objects/expression';

export class MatchBuilder {
  expression(expr: Expression) {
    return Object.assign(this, expr);
  }
  match(fieldName, fieldValue) {
    this[fieldName] = fieldValue;
    return this;
  }
}
