'use strict';

describe('Root', function () {
    var MemberList;
    var React = require('react');
    var TestUtils = require('react/lib/ReactTestUtils');

    var Root;

    beforeEach(function () {
        Root = require('../../../build/components/root');
    });

    it('can add a member', function () {
        var component = React.createElement(Root, null);
        TestUtils.renderIntoDocument(component);

        expect(Root).exist;
        expect(Root).toBeTruthy();

        expect("Peter").toContain("Elvis");
    });
});