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
- [Unset][Unset]

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
                        
const groupStage = new GroupBuilder('_id')
        .count('total')
        .sum('aggregated_field', 'calculated_field');

const pipeline = new Builder()
    .match(matchStage)
    .project(projectStage)
    .group(groupStage)
    .build();

const response = await db.<collection>.aggregate(pipeline);
```

## Examples

### Project Builder
```ts
test('project Builder', () => {
  const expected = {
    field_name: 1,
    calculated_field: '$another_field',
    remove_field: 0,
  };
  const recieved = new ProjectBuilder()
    .includeField('field_name')
    .addField('calculated_field', '$another_field')
    .excludeField('remove_field');
    
  expect(recieved).toEqual(expected);
});
```

### Group Builder
```ts
test('group Builder', () => {
  const expected = {
    _id: 'groupName',
    aggregated_field: { $sum: '$aggregated_val' },
  };
  const recieved = new GroupBuilder('groupName').sum('aggregated_field', 'aggregated_val');
  
  expect(recieved).toEqual(expected);
});
```
### filter
```ts
test('filter and return first from db array', () => {
  const expected = {
    mysql_db: {
      $first: {
        $filter: { input: '$db_list', as: 'db', cond: { $eq: ['$$db.name', 'mysql'] } },
      },
    },
  };

  const mysqlDb = new Comparison(Operator.EQ, '$$db.name', 'mysql');
  const filterSourcesArray = new Filter('$db_list', 'db', mysqlDb);
  const received = new ProjectBuilder().addField('mysql_db', filterSourcesArray.first());

  expect(JSON.stringify(received)).toEqual(JSON.stringify(expected));
});
```
[Project]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/
[Facet]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/
[Group]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/Group/
[Unwind]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/Unwind/
[Filter]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/Filter/
[Unset]: https://www.mongodb.com/docs/manual/reference/operator/aggregation/unset/