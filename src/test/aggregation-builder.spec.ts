import { Builder } from '../builders/builder';
import { FacetBuilder } from '../builders/facet';
import { GroupBuilder } from '../builders/group';
import { MatchBuilder } from '../builders/match';
import { ProjectBuilder } from '../builders/project';
import { Comparison } from '../objects/comparison';
import { Expression } from '../objects/expression';
import { Filter } from '../objects/filter';
import { Operator } from '../types/operators';

test('project Builder', () => {
  const expectResult = {
    field_name: 1,
    calculated_field: '$another_field',
    remove_field: 0,
  };
  const actualResult = new ProjectBuilder()
    .includeField('field_name')
    .addField('calculated_field', '$another_field')
    .excludeField('remove_field');
  expect(expectResult).toEqual(actualResult);
});

test('group Builder', () => {
  const expectResult = {
    _id: 'groupName',
    aggregated_field: { $sum: '$aggregated_val' },
  };
  const actualResult = new GroupBuilder('groupName').sum('aggregated_field', 'aggregated_val');
  expect(expectResult).toEqual(actualResult);
});

test('pipeline Builder', () => {
  const expectResult = [
    { $project: {} },
    { $addFields: {} },
    { $facet: {} },
    { $unset: {} },
    { $group: {} },
    { $match: {} },
  ];
  const actualResult = new Builder().project({}).addFields({}).facet({}).unset({}).group({}).match({}).build();
  expect(actualResult).toEqual(expectResult);
});

test('match', () => {
  const expectResult = {
    field_name: 'value',
  };
  const actualResult = new MatchBuilder().match('field_name', 'value');
  expect(expectResult).toEqual(actualResult);
});

test('test structure', () => {
  const query = [
    { $match: { source: { $in: ['mysql', 'mongo'] } } },
    {
      $project: {
        field_name: 1,
        status: {
          $first: {
            $filter: { input: '$properties', as: 'property', cond: { $eq: ['$$property.k', 'status'] } },
          },
        },
        field_owner: 1,
        field_type: 1,
      },
    },
    {
      $group: {
        _id: { field_owner: '$field_owner', field_type: '$field_type' },
        totalCount: { $sum: 1 },
        completedCount: { $sum: { $cond: [{ $ne: ['$status.v', 'completed'] }, 1, 0] } },
      },
    },
    {
      $project: {
        completedCount: 1,
        totalCount: 1,
        _id: 0,
        attributeName: '$_id.field_owner',
        attributeType: '$_id.field_type',
      },
    },
    {
      $facet: {
        curationStatus: [
          {
            $group: {
              _id: 0,
              totalCount: { $sum: 1 },
              completedCount: { $sum: 1 },
            },
          },
          { $unset: ['_id'] },
        ],
        statusPerField: [],
      },
    },
  ];

  const queryWithBuilder = new Builder()
    .match(new MatchBuilder().expression(new Expression('source', new Expression(Operator.IN, ['mysql', 'mongo']))))
    .project(
      new ProjectBuilder()
        .includeField('field_name')
        .addField(
          'status',
          new Filter('$properties', 'property', new Comparison(Operator.EQ, '$$property.k', 'status')).first(),
        )
        .includeField('field_owner')
        .includeField('field_type'),
    )
    .group(
      new GroupBuilder({ field_owner: '$field_owner', field_type: '$field_type' })
        .count('totalCount')
        .countByCond('completedCount', new Comparison(Operator.NE, '$status.v', 'completed')),
    )
    .project(
      new ProjectBuilder()
        .includeField('completedCount')
        .includeField('totalCount')
        .excludeField('_id')
        .addField('attributeName', '$_id.field_owner')
        .addField('attributeType', '$_id.field_type'),
    )
    .facet(
      new FacetBuilder()
        .addFacet(
          'curationStatus',
          new Builder().group(new GroupBuilder(0).count('totalCount').count('completedCount')).unset(['_id']).build(),
        )
        .addFacet('statusPerField', []),
    )
    .build();

  expect(JSON.stringify(query)).toEqual(JSON.stringify(queryWithBuilder));
});
