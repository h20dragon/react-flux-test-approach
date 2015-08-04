'use strict';

var React = require('react');

var Root = React.createClass({
    displayName: 'Root',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Hello World!!!'
            ),
            React.createElement(
                'p',
                null,
                'Please input your name here:',
                React.createElement('input', { onChange: this.handleChange,
                    value: this.state.name
                })
            ),
            React.createElement(
                'p',
                null,
                'Hello, ',
                this.state.name
            )
        );
    },

    getInitialState: function getInitialState() {
        return {
            name: ''
        };
    },

    handleChange: function handleChange(e) {
        var newName = e.target.value();
        this.setState({
            name: newName
        });
    }

});

module.exports = Root;