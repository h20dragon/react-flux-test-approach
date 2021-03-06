var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');


describe('MemberList', () => {
  var MemberList;

  beforeEach(() => {
    MemberList = require('../../../build/components/MemberList')
  });

  it('can add a new member', () => {
    var c = TestUtils.renderIntoDocument(<MemberList />);
    var input = React.findDOMNode(c.refs.input);
    var submit = React.findDOMNode(c.refs.submit);

    expect(React.findDOMNode(c).textContent).toBe('');

    TestUtils.Simulate.change(input, { target: { value: 'baz' } });
    TestUtils.Simulate.click(submit);
    jasmine.clock().tick(1);

    expect(React.findDOMNode(c).textContent).toBe('baz');
    expect(input.value).toBe('');
  });
});
