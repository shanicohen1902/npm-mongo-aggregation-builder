"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = exports.Comparison = exports.BoolOperator = exports.Operator = exports.Filter = exports.MatchBuilder = exports.GroupBuilder = exports.FacetBuilder = exports.ProjectBuilder = exports.Builder = void 0;
class Builder {
    constructor(list = []) {
        this.list = list;
    }
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
exports.Builder = Builder;
class ProjectBuilder {
    constructor() { }
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
exports.ProjectBuilder = ProjectBuilder;
class FacetBuilder {
    constructor() { }
    addFacet(facetName, piplineList) {
        this[facetName] = piplineList;
        return this;
    }
}
exports.FacetBuilder = FacetBuilder;
class GroupBuilder {
    constructor(_id) {
        this['_id'] = _id;
    }
    addField(fieldName, value) {
        this[fieldName] = value;
        return this;
    }
    count(fieldName) {
        this[fieldName] = { $sum: 1 };
        return this;
    }
    sum(fieldName, fieldToSum) {
        this[fieldName] = { $sum: '$' + fieldToSum };
        return this;
    }
    countByCond(fieldName, condition) {
        const sumIfElseArray = [condition, 1, 0];
        const sumIfElse = {
            $cond: sumIfElseArray,
        };
        this[fieldName] = { $sum: sumIfElse };
        return this;
    }
}
exports.GroupBuilder = GroupBuilder;
class MatchBuilder {
    constructor() { }
    expression(expr) {
        return Object.assign(this, expr);
    }
}
exports.MatchBuilder = MatchBuilder;
class Filter {
    constructor(input, as, condition) {
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
exports.Filter = Filter;
var Operator;
(function (Operator) {
    Operator["LT"] = "$lt";
    Operator["GT"] = "$gt";
    Operator["EQ"] = "$eq";
    Operator["NE"] = "$ne";
    Operator["IN"] = "$in";
})(Operator = exports.Operator || (exports.Operator = {}));
var BoolOperator;
(function (BoolOperator) {
    BoolOperator["AND"] = "$and";
    BoolOperator["OR"] = "$or";
})(BoolOperator = exports.BoolOperator || (exports.BoolOperator = {}));
class Comparison {
    constructor(operator, expr1, expr2) {
        this[operator] = [expr1, expr2];
    }
}
exports.Comparison = Comparison;
class Expression {
    constructor(expr, expression) {
        this[expr] = expression;
    }
}
exports.Expression = Expression;
//# sourceMappingURL=index.js.map