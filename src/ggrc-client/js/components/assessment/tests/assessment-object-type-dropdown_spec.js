/*
  Copyright (C) 2018 Google Inc.
  Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

describe('GGRC.Components.assessmentObjectTypeDropdown', function () {
  'use strict';

  var viewModel;

  beforeEach(function () {
    viewModel = GGRC.Components
      .getViewModel('assessmentObjectTypeDropdown');
  });

  it('returns the types obtained from the GGRC.Mappings', function () {
    var result;

    var objectTypes = {
      groupFoo: {
        name: 'Foo Objects',
        items: [{name: 'Foo1'}, {value: 'Foo2'}]
      },
      groupBar: {
        name: 'Bar Objects',
        items: [{value: 'Bar1'}, {value: 'Bar2'}]
      }
    };

    spyOn(GGRC.Mappings, 'getMappingTypes').and.returnValue(objectTypes);
    result = viewModel.attr('objectTypes');
    expect(result).toEqual(objectTypes);
  });

  it('sorts types within a group by name', function () {
    var result;

    var objectTypes = {
      groupFoo: {
        name: 'Bar-ish Objects',
        items: [
          {name: 'Car'}, {name: 'Bar'}, {name: 'Zar'}, {name: 'Dar'}
        ]
      }
    };

    var expected = [
      {name: 'Bar'}, {name: 'Car'}, {name: 'Dar'}, {name: 'Zar'}
    ];

    spyOn(GGRC.Mappings, 'getMappingTypes').and.returnValue(objectTypes);

    result = viewModel.attr('objectTypes');
    expect(result.groupFoo.items).toEqual(expected);
  });

  it('omits the all_objects group from result', function () {
    var result;

    var objectTypes = {
      all_objects: {
        models: ['Foo', 'Bar', 'Baz'],
        name: 'FooBarBaz-type Objects'
      }
    };

    spyOn(GGRC.Mappings, 'getMappingTypes').and.returnValue(objectTypes);

    result = viewModel.attr('objectTypes');
    expect(result.all_objects).toBeUndefined();
  });

  it('omits the types not relevant to the AssessmentTemplate from result',
    function () {
      var result;

      var objectTypes = {
        groupFoo: {
          name: 'Foo Objects',
          items: [
            {value: 'Contract'},  // this object type is relevant
            {value: 'Assessment'},
            {value: 'Audit'},
            {value: 'CycleTaskGroupObjectTask'}
          ]
        },
        groupBar: {
          name: 'Bar Objects',
          items: [
            {value: 'Policy'},  // this object type is relevant
            {value: 'TaskGroup'},
            {value: 'TaskGroupTask'}
          ]
        },
        groupBaz: {
          name: 'Baz Objects',
          items: [
            {value: 'Workflow'}
          ]
        }
      };

      var expected = {
        groupFoo: {
          name: 'Foo Objects',
          items: [{value: 'Contract'}]
        },
        groupBar: {
          name: 'Bar Objects',
          items: [{value: 'Policy'}]
        }
        // the groupBaz group, being empty, is expected to have been removed
      };

      spyOn(GGRC.Mappings, 'getMappingTypes').and.returnValue(objectTypes);

      result = viewModel.attr('objectTypes');
      expect(result).toEqual(expected);
    }
  );
});
