var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');

describe('MemberStore', () => {

    var Simple;

    beforeEach(() => {
        Simple = require('../../../build/components//Simple')
    });


    it('can add a member', () => {
        var component = <Simple />;
        TestUtils.renderIntoDocument(component);

        expect(Simple).toBeTruthy();

        !expect(Simple).exist;
    });

});
