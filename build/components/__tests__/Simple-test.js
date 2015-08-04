'use strict';

describe('MemberStore', function () {
    var MemberList;
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');

    var MemberList;

    beforeEach(function () {
        MemberList = require('../Simple.jsx');
    });

    it('can add a member', function () {
        var component = React.createElement(MemberList, null);
        TestUtils.renderIntoDocument(component);

        expect(MemberList).toBeTruthy();
        !expect(MemberList).exist;
    });
});