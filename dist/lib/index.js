"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = exports.Comparison = exports.BoolOperator = exports.Operator = exports.Filter = exports.MatchBuilder = exports.GroupBuilder = exports.FacetBuilder = exports.ProjectBuilder = exports.Builder = void 0;
var Builder = (function () {
    function Builder(list) {
        if (list === void 0) {
            list = [];
        }
        this.list = list;
    }
    Builder.prototype.build = function () {
        return this.list;
    };
    Builder.prototype.pipe = function (stage) {
        this.list.push(stage);
        return this;
    };
    Builder.prototype.match = function (stage) {
        this.list.push({
            $match: stage,
        });
        return this;
    };
    Builder.prototype.facet = function (stage) {
        this.list.push({
            $facet: stage,
        });
        return this;
    };
    Builder.prototype.unset = function (list) {
        this.list.push({
            $unset: list,
        });
        return this;
    };
    Builder.prototype.addFields = function (stage) {
        this.list.push({
            $addFields: stage,
        });
        return this;
    };
    Builder.prototype.project = function (stage) {
        this.list.push({
            $project: stage,
        });
        return this;
    };
    Builder.prototype.group = function (stage) {
        this.list.push({
            $group: stage,
        });
        return this;
    };
    return Builder;
}());
exports.Builder = Builder;
var ProjectBuilder = (function () {
    function ProjectBuilder() {
    }
    ProjectBuilder.prototype.includeField = function (fieldName) {
        this[fieldName] = 1;
        return this;
    };
    ProjectBuilder.prototype.excludeField = function (fieldName) {
        this[fieldName] = 0;
        return this;
    };
    ProjectBuilder.prototype.addField = function (fieldName, spec) {
        this[fieldName] = spec;
        return this;
    };
    return ProjectBuilder;
}());
exports.ProjectBuilder = ProjectBuilder;
var FacetBuilder = (function () {
    function FacetBuilder() {
    }
    FacetBuilder.prototype.addFacet = function (facetName, piplineList) {
        this[facetName] = piplineList;
        return this;
    };
    return FacetBuilder;
}());
exports.FacetBuilder = FacetBuilder;
var GroupBuilder = (function () {
    function GroupBuilder(_id) {
        this['_id'] = _id;
    }
    GroupBuilder.prototype.addField = function (fieldName, value) {
        this[fieldName] = value;
        return this;
    };
    GroupBuilder.prototype.count = function (fieldName) {
        this[fieldName] = { $sum: 1 };
        return this;
    };
    GroupBuilder.prototype.sum = function (fieldName, fieldToSum) {
        this[fieldName] = { $sum: '$' + fieldToSum };
        return this;
    };
    GroupBuilder.prototype.countByCond = function (fieldName, condition) {
        var sumIfElseArray = [condition, 1, 0];
        var sumIfElse = {
            $cond: sumIfElseArray,
        };
        this[fieldName] = { $sum: sumIfElse };
        return this;
    };
    return GroupBuilder;
}());
exports.GroupBuilder = GroupBuilder;
var MatchBuilder = (function () {
    function MatchBuilder() {
    }
    MatchBuilder.prototype.expression = function (expr) {
        return Object.assign(this, expr);
    };
    return MatchBuilder;
}());
exports.MatchBuilder = MatchBuilder;
var Filter = (function () {
    function Filter(input, as, condition) {
        this['$filter'] = {
            input: input,
            as: as,
            cond: condition,
        };
    }
    Filter.prototype.first = function () {
        return { $first: this };
    };
    return Filter;
}());
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
var Comparison = (function () {
    function Comparison(operator, expr1, expr2) {
        this[operator] = [expr1, expr2];
    }
    return Comparison;
}());
exports.Comparison = Comparison;
var Expression = (function () {
    function Expression(expr, expression) {
        this[expr] = expression;
    }
    return Expression;
}());
exports.Expression = Expression;
//# sourceMappingURL=index.js.map