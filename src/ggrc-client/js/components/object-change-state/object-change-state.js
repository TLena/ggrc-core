/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

var viewModel = can.Map.extend({
  toState: '@',
  changeState: function (newState) {
    this.dispatch({
      type: 'onStateChange',
      state: newState,
    });
  },
});

var events = {
  click: function (element, event) {
    var newState = this.viewModel.attr('toState');
    this.viewModel.changeState(newState);
    event.preventDefault();
  },
};

export default GGRC.Components('objectChangeState', {
  tag: 'object-change-state',
  viewModel: viewModel,
  events: events,
});
