import { Expression } from 'src/objects/expression';

export class GroupBuilder {
  constructor(_id: any) {
    this['_id'] = _id;
  }

  addField(fieldName: string, value: any) {
    this[fieldName] = value;
    return this;
  }

  count(fieldName: string) {
    this[fieldName] = { $sum: 1 };
    return this;
  }

  sum(fieldName: string, fieldToSum) {
    this[fieldName] = { $sum: '$' + fieldToSum };
    return this;
  }

  countByCond(fieldName: string, condition: Expression) {
    const sumIfElseArray = [condition, 1, 0];
    const sumIfElse = {
      $cond: sumIfElseArray,
    };
    this[fieldName] = { $sum: sumIfElse };
    return this;
  }
}
