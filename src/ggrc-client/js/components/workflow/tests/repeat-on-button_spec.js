/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

describe('GGRC.Components.repeatOnButton', function () {
  'use strict';

  var viewModel;
  var events;
  var getTitle = function (option) {
    return option.title;
  };

  beforeAll(function () {
    var Component = GGRC.Components.get('repeatOnButton');
    events = Component.prototype.events;
  });

  beforeEach(function () {
    viewModel = GGRC.Components.getViewModel('repeatOnButton');
  });

  describe('buttonText getter', function () {
    it('returns Off-indication when no unit was selected', function () {
      var result = viewModel.attr('buttonText');

      expect(result).toEqual('Repeat Off');
    });

    it('returns on-indication when unit was selected', function () {
      var result;
      viewModel.attr('unit', 'day');

      result = viewModel.attr('buttonText');

      expect(result).toEqual('Repeat On');
    });
  });

  describe('modalTitle getter', function () {
    it('returns Off-indication when repeat was disabled', function () {
      var result = viewModel.attr('modalTitle');

      expect(result).toEqual('Repeat Off');
    });

    it('returns on-indication when repeat was enabled', function () {
      var result;
      viewModel.attr('repeatEnabled', true);

      result = viewModel.attr('modalTitle');

      expect(result).toEqual('Repeat On');
    });
  });

  describe('updateRepeatEveryOptions method', function () {
    var repeatOptions = [
      {
        value: 1,
        title: '1'
      },
      {
        value: 2,
        title: '2'
      }];
    var unitOptions = [
      {title: 'Daily', value: 'day', plural: 'days', singular: 'day'},
      {title: 'Weekly', value: 'week', plural: 'weeks', singular: 'week'},
      {title: 'Monthly', value: 'month', plural: 'months', singular: 'month'}
    ];

    beforeEach(function () {
      viewModel.attr('repeatOptions', repeatOptions);
      viewModel.attr('unitOptions', unitOptions);
    });

    it('should not update options when unit was not selected',
    function () {
      var actualTitles;
      var expectedTitles = repeatOptions.map(getTitle);

      viewModel.updateRepeatEveryOptions();

      actualTitles = can.makeArray(viewModel.attr('repeatOptions'))
        .map(getTitle);
      expect(actualTitles).toEqual(expectedTitles);
    });

    it('should update options when unit was not selected',
    function () {
      var actualTitles;
      var expectedTitles = ['1 week', '2 weeks'];
      viewModel.attr('state.result.unit', 'week');

      viewModel.updateRepeatEveryOptions();

      actualTitles = can.makeArray(viewModel.attr('repeatOptions'))
        .map(getTitle);
      expect(actualTitles).toEqual(expectedTitles);
    });
  });

  describe('initSelectedOptions method', function () {
    it('should initialize values from injected properties',
    function () {
      var unit = 'day';
      var repeatEvery = '2';
      viewModel.attr('unit', unit);
      viewModel.attr('repeatEvery', repeatEvery);

      viewModel.initSelectedOptions();

      expect(viewModel.attr('state.result.unit')).toEqual(unit);
      expect(viewModel.attr('state.result.repeatEvery')).toEqual(repeatEvery);
      expect(viewModel.attr('repeatEnabled')).toBeTruthy();
    });
  });

  describe('init method', function () {
    it('should initialize values from injected properties',
    function () {
      var unit = 'day';
      var repeatEvery = '2';
      viewModel.attr('unit', unit);
      viewModel.attr('repeatEvery', repeatEvery);

      viewModel.init();

      expect(viewModel.attr('state.result.unit')).toEqual(unit);
      expect(viewModel.attr('state.result.repeatEvery')).toEqual(repeatEvery);
      expect(viewModel.attr('repeatEnabled')).toBeTruthy();
    });
  });

  describe('save method', function () {
    var saveDfd;
    beforeEach(function () {
      saveDfd = can.Deferred();
      viewModel.attr('onSaveRepeat', function () {
        return saveDfd;
      });
    });

    it('should notify with selected values when repeat is enabled',
    function () {
      var unit = 'day';
      var repeatEvery = '2';
      viewModel.attr('state.result.unit', unit);
      viewModel.attr('state.result.repeatEvery', repeatEvery);
      viewModel.attr('repeatEnabled', true);

      viewModel.save();

      expect(viewModel.attr('isSaving')).toBeTruthy();

      saveDfd.resolve();
      expect(viewModel.attr('isSaving')).toBeFalsy();
      expect(viewModel.attr('state.open')).toBeFalsy();
    });

    it('should notify with empty values when repeat is disabled',
    function () {
      viewModel.save();

      expect(viewModel.attr('isSaving')).toBeTruthy();

      saveDfd.resolve();
      expect(viewModel.attr('isSaving')).toBeFalsy();
      expect(viewModel.attr('state.open')).toBeFalsy();
    });
  });

  describe('unit update event', function () {
    var unitChanged;
    var context;
    var repeatOptions = [
      {
        value: 1,
        title: '1'
      },
      {
        value: 2,
        title: '2'
      }];

    beforeAll(function () {
      unitChanged = events['{state.result} unit'];
      viewModel.attr('repeatOptions', repeatOptions);
      context = {
        viewModel: viewModel
      };
    });

    it('should update repeat options when unit changed',
    function () {
      var actualTitles;
      var expectedTitles = ['1 weekday', '2 weekdays'];
      context.viewModel.attr('state.result.unit', 'day');

      unitChanged.apply(context);

      actualTitles = can.makeArray(context.viewModel.attr('repeatOptions'))
        .map(getTitle);
      expect(actualTitles).toEqual(expectedTitles);
    });
  });

  describe('open update event', function () {
    var openChanged;
    var context;

    beforeAll(function () {
      openChanged = events['{state} open'];
      context = {
        viewModel: viewModel
      };
    });

    it('should set saved values for options when modal with unit opens',
    function () {
      var unit = 'day';
      var repeatEvery = '2';
      context.viewModel.attr('state.open', true);
      context.viewModel.attr('unit', unit);
      context.viewModel.attr('repeatEvery', repeatEvery);
      openChanged.apply(context);

      expect(context.viewModel.attr('state.result.unit'))
        .toEqual(unit);
      expect(context.viewModel.attr('state.result.repeatEvery'))
        .toEqual(repeatEvery);
      expect(context.viewModel.attr('repeatEnabled'))
        .toBeTruthy();
    });

    it('should set default values for options when modal without unit opens',
    function () {
      context.viewModel.attr('state.open', true);
      context.viewModel.attr('unit', null);
      context.viewModel.attr('repeatEvery', 0);

      openChanged.apply(context);

      expect(context.viewModel.attr('state.result.unit')).toEqual('month');
      expect(context.viewModel.attr('state.result.repeatEvery')).toEqual(1);
    });
  });
});
