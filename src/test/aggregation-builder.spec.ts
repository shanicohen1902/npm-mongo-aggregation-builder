import {
    Builder,
    Comparison,
    Expression, FacetBuilder,
    Filter,
    GroupBuilder,
    MatchBuilder,
    Operator,
    ProjectBuilder,
  } from '../index';
  
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
    const actualResult = new Builder()
      .project({})
      .addFields({})
      .facet({})
      .unset({})
      .group({})
      .match({})
      .build();
    expect(actualResult).toEqual(expectResult);
  });
  
  test('test structure', () => {
    const query = [
      { $match: { source: { $in: ['mysql', 'can-api-default-ds'] } } },
      {
        $project: {
          field_name: 1,
          reviewStatus: {
            $first: {
              $filter: { input: '$properties', as: 'property', cond: { $eq: ['$$property.k', 'reviewStatus'] } },
            },
          },
          attribute_name: 1,
          attribute_type: 1,
        },
      },
      {
        $group: {
          _id: { attribute_name: '$attribute_name', attribute_type: '$attribute_type' },
          totalCount: { $sum: 1 },
          curatedCount: { $sum: { $cond: [{ $ne: ['$reviewStatus.v', 'Uncurated'] }, 1, 0] } },
        },
      },
      {
        $project: {
          curatedCount: 1,
          totalCount: 1,
          _id: 0,
          attributeName: '$_id.attribute_name',
          attributeType: '$_id.attribute_type',
        },
      },
      {
        $facet: {
          curationStatus: [
            {
              $group: {
                _id: 0,
                totalCount: { $sum: 1 },
                curatedCount: { $sum: 1 },
              },
            },
            { $unset: ['_id'] },
          ],
          statusPerEntity: [],
        },
      },
    ];
  
    const filterSources = new Expression(Operator.IN, ['mysql', 'can-api-default-ds']);
    const reviewStatusKey = new Comparison(Operator.EQ, '$$property.k', 'reviewStatus');
  
    const queryWithBuilder = new Builder()
      .match(new MatchBuilder().expression(new Expression('source', filterSources)))
      .project(
        new ProjectBuilder()
          .includeField('field_name')
          .addField('reviewStatus', new Filter('$properties', 'property', reviewStatusKey).first())
          .includeField('attribute_name')
          .includeField('attribute_type'),
      )
      .group(
        new GroupBuilder({ attribute_name: '$attribute_name', attribute_type: '$attribute_type' })
          .count('totalCount')
          .countByCond('curatedCount', new Comparison(Operator.NE, '$reviewStatus.v', 'Uncurated')),
      )
      .project(
        new ProjectBuilder()
          .includeField('curatedCount')
          .includeField('totalCount')
          .excludeField('_id')
          .addField('attributeName', '$_id.attribute_name')
          .addField('attributeType', '$_id.attribute_type'),
      )
      .facet(
        new FacetBuilder()
          .addFacet(
            'curationStatus',
            new Builder()
              .group(new GroupBuilder(0).count('totalCount').count('curatedCount'))
              .unset(['_id'])
              .build(),
          )
          .addFacet('statusPerEntity', []),
      )
      .build();
  
    expect(JSON.stringify(query)).toEqual(JSON.stringify(queryWithBuilder));
  });
  