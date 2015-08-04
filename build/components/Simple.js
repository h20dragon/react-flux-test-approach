'use strict';

var MemberActions = require('../actions/MemberActions');
var MemberStore = require('../stores/MemberStore');
var React = require('react/addons');
var Reflux = require('reflux');

var MemberList = React.createClass({
    displayName: 'MemberList',

    mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin],

    getInitialState: function getInitialState() {
        return {
            members: MemberStore.members(),
            newMemberName: ''
        };
    },

    componentDidMount: function componentDidMount() {
        var _this = this;

        this.listenTo(MemberStore, function () {
            _this.setState(_this.getInitialState());
        });
    },

    addMember: function addMember() {
        MemberActions.addMember(this.state.newMemberName);
        this.setState({ newMemberName: '' });
    },

    render: function render() {
        return React.createElement(
            'main',
            null,
            React.createElement(
                'ul',
                null,
                this.state.members.map(function (member) {
                    return React.createElement(
                        'li',
                        { key: member.get('name') },
                        member.get('name')
                    );
                })
            ),
            React.createElement('input', { valueLink: this.linkState('newMemberName'), ref: 'input' }),
            React.createElement('button', { onClick: this.addMember, ref: 'submit' })
        );
    }
});

module.exports = MemberList;