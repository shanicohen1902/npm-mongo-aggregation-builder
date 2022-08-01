export class Builder {
    constructor(private list:any[] = []) {}
  
    build() {
      return this.list;
    }
  
    pipe(stage) {
      this.list.push(stage);
      return this;
    }
  
    match(stage) {
      this.list.push({
        $match: stage,
      });
      return this;
    }
  
    facet(stage) {
      this.list.push({
        $facet: stage,
      });
      return this;
    }
  
    unset(list) {
      this.list.push({
        $unset: list,
      });
      return this;
    }
  
    addFields(stage) {
      this.list.push({
        $addFields: stage,
      });
      return this;
    }
  
    project(stage) {
      this.list.push({
        $project: stage,
      });
      return this;
    }
  
    group(stage) {
      this.list.push({
        $group: stage,
      });
      return this;
    }
  }
  
  export class ProjectBuilder {
    constructor() {}
  
    includeField(fieldName) {
      this[fieldName] = 1;
      return this;
    }
  
    excludeField(fieldName) {
      this[fieldName] = 0;
      return this;
    }
  
    addField(fieldName, spec) {
      this[fieldName] = spec;
      return this;
    }
  }
  
  export class FacetBuilder {
    constructor() {}
    addFacet(facetName, piplineList) {
      this[facetName] = piplineList;
      return this;
    }
  }
  
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
  
  export class MatchBuilder {
    constructor() {}
    expression(expr: Expression) {
      return Object.assign(this, expr);
    }
  }
  
  export class Filter {
    constructor(input: string, as: string, condition: any) {
      this['$filter'] = {
        input: input,
        as: as,
        cond: condition,
      };
    }
  
    first() {
      return { $first: this };
    }
  }
  
  export enum Operator {
    LT = '$lt',
    GT = '$gt',
    EQ = '$eq',
    NE = '$ne',
    IN = '$in',
  }
  
  export enum BoolOperator {
    AND = '$and',
    OR = '$or',
  }
  
  export class Comparison {
    constructor(operator: Operator, expr1, expr2) {
      this[operator] = [expr1, expr2];
    }
  }
  
  export class Expression {
    constructor(expr: BoolOperator | Operator | string, expression) {
      this[expr] = expression;
    }
  }
  