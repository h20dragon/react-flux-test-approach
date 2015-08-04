'use strict';

describe('MemberStore', function () {
  var MemberActions;
  var MemberStore;

  beforeEach(function () {
    MemberActions = require('../../actions/MemberActions');
    MemberStore = require('../MemberStore');

    MemberActions.addMember('foo');
    jasmine.clock().tick();
  });

  it('can add a member', function () {
    var members = MemberStore.members();
    expect(members.toJS()).toEqual([{ name: 'foo' }]);
  });

  it('busts the require cache', function () {
    MemberActions.addMember('bar');
    jasmine.clock().tick();

    var members = MemberStore.members();
    expect(members.toJS()).toEqual([{ name: 'foo' }, { name: 'bar' }]);
  });
});