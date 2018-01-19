/*
  Copyright (C) 2018 Google Inc.
  Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

describe('GGRC.Components.mapperResultsItem', function () {
  'use strict';

  var viewModel;

  beforeEach(function () {
    viewModel = GGRC.Components.getViewModel('mapperResultsItem');
  });

  describe('displayItem() method', function () {
    it('returns content of revesion if itemData.revesion defined',
     function () {
       var result;
       viewModel.attr('itemData', {
         revision: {
           content: 'mockData'
         }
       });
       result = viewModel.displayItem();
       expect(result).toEqual('mockData');
     });

    it('returns itemData if itemData.revesion undefined',
      function () {
        var result;
        viewModel.attr('itemData', 'mockData');
        result = viewModel.displayItem();
        expect(result).toEqual('mockData');
      });
  });

  describe('title() method', function () {
    var itemData;
    beforeEach(function () {
      itemData = {
        title: 'mockTitle',
        description_inline: 'mockDescription',
        name: 'mockName',
        email: 'mockEmail'
      };
    });

    it('returns item title', function () {
      var result;
      viewModel.attr('itemData', itemData);
      result = viewModel.title();
      expect(result).toEqual('mockTitle');
    });

    it('returns item description if no title', function () {
      var result;
      viewModel.attr('itemData', _.assign(itemData, {
        title: undefined
      }));
      result = viewModel.title();
      expect(result).toEqual('mockDescription');
    });

    it('returns item name if no title and description', function () {
      var result;
      viewModel.attr('itemData', _.assign(itemData, {
        title: undefined,
        description_inline: undefined
      }));
      result = viewModel.title();
      expect(result).toEqual('mockName');
    });

    it('returns item email if no title, description, name',
      function () {
        var result;
        viewModel.attr('itemData', _.assign(itemData, {
          title: undefined,
          description_inline: undefined,
          name: undefined
        }));
        result = viewModel.title();
        expect(result).toEqual('mockEmail');
      });
  });

  describe('toggleIconCls() method', function () {
    it('returns fa-caret-down if showDetails is true', function () {
      var result;
      viewModel.attr('showDetails', true);
      result = viewModel.toggleIconCls();
      expect(result).toEqual('fa-caret-down');
    });

    it('returns fa-caret-right if showDetails is false',
      function () {
        var result;
        viewModel.attr('showDetails', false);
        result = viewModel.toggleIconCls();
        expect(result).toEqual('fa-caret-right');
      });
  });

  describe('toggleDetails() method', function () {
    it('changes viewModel.showDetails to false if was true', function () {
      viewModel.attr('showDetails', true);
      viewModel.toggleDetails();
      expect(viewModel.attr('showDetails')).toEqual(false);
    });
    it('changes viewModel.showDetails to true if was false', function () {
      viewModel.attr('showDetails', false);
      viewModel.toggleDetails();
      expect(viewModel.attr('showDetails')).toEqual(true);
    });
  });

  describe('isSnapshot() method', function () {
    it('returns true if it is snapshot', function () {
      var result;
      viewModel.attr('itemData', {
        type: CMS.Models.Snapshot.model_singular
      });
      result = viewModel.isSnapshot();
      expect(result).toEqual(true);
    });

    it('returns false if it is not snapshot', function () {
      var result;
      viewModel.attr('itemData', {
        type: 'mockType'
      });
      result = viewModel.isSnapshot();
      expect(result).toEqual(false);
    });
  });

  describe('objectType() method', function () {
    it('returns child_type if it is snapshot', function () {
      var result;
      viewModel.attr('itemData', {
        type: CMS.Models.Snapshot.model_singular,
        child_type: 'mockType'
      });
      result = viewModel.objectType();
      expect(result).toEqual('mockType');
    });

    it('returns type if it is not snapshot', function () {
      var result;
      viewModel.attr('itemData', {
        type: 'mockType'
      });
      result = viewModel.objectType();
      expect(result).toEqual('mockType');
    });
  });

  describe('objectTypeIcon() method', function () {
    it('returns object type icon', function () {
      var postfix;
      var result;
      viewModel.attr('itemData', {
        type: 'Program'
      });
      postfix = CMS.Models.Program.table_singular;
      result = viewModel.objectTypeIcon();
      expect(result).toEqual('fa-' + postfix);
    });
  });

  describe('showRelatedAssessments() method', function () {
    it('dispatches event', function () {
      spyOn(viewModel, 'dispatch');
      viewModel.attr('itemData', 'mockData');
      viewModel.showRelatedAssessments();
      expect(viewModel.dispatch).toHaveBeenCalledWith(
        jasmine.objectContaining({
          type: 'showRelatedAssessments',
          instance: 'mockData'
        })
      );
    });
  });
});
