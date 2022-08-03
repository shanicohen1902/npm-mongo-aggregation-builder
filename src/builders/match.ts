import { Expression } from 'src/objects/expression';

export class MatchBuilder {
  expression(expr: Expression) {
    return Object.assign(this, expr);
  }
  match(field_name, field_value) {
    this[field_name] = field_value;
    return this;
  }
}
