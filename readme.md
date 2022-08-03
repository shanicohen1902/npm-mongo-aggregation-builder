# mongo-simple-aggregation-builder 

A Node.js typescript implementation of mongodb aggregation query, with builder
syntax.

mongo-simple-aggregation-builder includes TypeScript definition for superior development
experience.

## MongoDB compatibility

What's Included:

- [Project][Project]
- [Group][Group]
- [Facet][Facet]
- [Unwind][Unwind]
- [Filter][Filter]

## Install

```
npm install mongo-simple-aggregation-builder --save
```
## Motivation

Using mongo-simple-aggregation-builder, aggregation queries can be created in a flexible, imperative fashion instead of huge static query objects.

## Usage
```ts
import { Builder, FacetBuilder, GroupBuilder, MatchBuilder, ProjectBuilder } from 'mongo-simple-aggregation-builder'

const matchStage = new MatchBuilder().match('field_name', 'value');

const projectStage = new ProjectBuilder()
        .includeField('field_name')
        .addField('calculated_field', '$another_field');
                        
const groupStage = new GroupBuilder('id')
        .count('total')
        .sum('aggregated_field', 'aggregated_val');

const pipeline = new Builder()
    .match(matchStage)
    .project(projectStage)
    .group(groupStage)
    .build();
```

## Examples

```

```
## Tests

Run unit tests:

```
npm test
```
[Project]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
[Facet]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/
[Group]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/Group/
[Unwind]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/Unwind/
[Filter]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/Filter/