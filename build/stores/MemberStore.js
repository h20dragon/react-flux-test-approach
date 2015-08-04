'use strict';

var Immutable = require('immutable');
var MemberActions = require('../actions/MemberActions');
var Reflux = require('reflux');

var _members = Immutable.List();

var MemberStore = Reflux.createStore({
  listenables: [MemberActions],

  members: function members() {
    return _members;
  },

  onAddMember: function onAddMember(name) {
    _members = _members.push(Immutable.Map({ name: name }));
    this.triggerAsync();
  }
});

module.exports = MemberStore;