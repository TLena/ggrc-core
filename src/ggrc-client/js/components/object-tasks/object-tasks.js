/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import {
  buildParam,
  batchRequests,
} from '../../plugins/utils/query-api-utils';
import template from './object-tasks.mustache';

(function (can, GGRC) {
  'use strict';

  var REQUIRED_TYPE = 'CycleTaskGroupObjectTask';
  var REQUIRED_FIELDS = Object.freeze([
    'title',
    'status',
    'next_due_date',
    'end_date',
    'is_verification_needed',
  ]);

  var viewModel = can.Map.extend({
    instanceId: null,
    instanceType: null,
    tasks: [],
    loadTasks: function () {
      var id = this.attr('instanceId');
      var type = this.attr('instanceType');
      var params = buildParam(
        REQUIRED_TYPE,
        {},
        {
          type: type,
          id: id,
          operation: 'relevant'
        },
        REQUIRED_FIELDS);

      return batchRequests(params)
        .then(function (response) {
          var tasks = [];

          response[REQUIRED_TYPE].values.forEach(function (item) {
            tasks.push(CMS.Models[REQUIRED_TYPE].model(item));
          });

          this.attr('tasks', tasks);
        }.bind(this));
    }
  });

  GGRC.Components('objectTasks', {
    tag: 'object-tasks',
    template: template,
    viewModel: viewModel,
    events: {
      inserted: function () {
        this.viewModel.addContent(this.viewModel.loadTasks());
      }
    }
  });
})(window.can, window.GGRC);
