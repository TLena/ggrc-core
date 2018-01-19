/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './templates/info-issue-tracker-fields.mustache';

const tag = 'info-issue-tracker-fields';

export default GGRC.Components('infoIssueTrackerFields', {
  tag: tag,
  template: template,
  viewModle: {
    instance: {},
  },
});
