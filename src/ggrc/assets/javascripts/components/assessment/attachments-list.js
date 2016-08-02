/*!
 Copyright (C) 2016 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

(function (GGRC, can) {
  'use strict';

  var namespace = 'assessment';
  var tag = 'assessment-attachments-list';
  var template = can.view(GGRC.mustache_path +
    '/components/' + namespace + '/attachments-list.mustache');

  /**
   * Wrapper Component for rendering and managing of attachments lists
   */
  GGRC.Components('assessmentAttachmentsList', {
    tag: tag,
    template: template,
    scope: {},
    events: {
      init: function () {}
    }
  });
})(window.GGRC, window.can);

