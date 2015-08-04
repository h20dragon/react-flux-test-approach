var React = require('react')
var TestUtils = require('react/lib/ReactTestUtils');


describe('Root', () => {

    var Root;

    beforeEach(() => {
        Root = require('../../../build/components/root')
    });

    it('renders without problems', function() {
        var root = TestUtils.renderIntoDocument(<Root/>);
        expect(root).exist;
    })

    it('can add a member', () => {
        var component = <Root />;
        TestUtils.renderIntoDocument(component);

        expect(Root).exist;
        expect(Root).toBeTruthy();

        expect("Peter").toContain("Elvis");
    });

});
