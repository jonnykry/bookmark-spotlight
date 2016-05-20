var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classnames = require('classnames');
var RefluxActions = require('../RefluxActions.jsx');
var SearchStore = require('../stores/SearchStore.jsx');

var ENTER_KEY_CODE = 13;
var DOWN_ARROW = 40;
var UP_ARROW = 38;

module.exports = React.createClass({
    mixins: [Reflux.connect(SearchStore, 'onFocusSearchBar', 'onRefocus', 'onFocusSearchBar')],

    getInitialState: function() {
        return {
            value: '',
            index: 0
        };
    },

    componentDidUpdate: function() {
        if (SearchStore.forceSeachBarFocus) this.focus();
    },

    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });

        if (event.target.value.length > 2) {
            RefluxActions.search(event.target.value);
        }
    },

    handleKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            if (this.state.value.length) {
                RefluxActions.search(this.state.value);
                this.setState({
                    value: ''
                });
            }
        } else if (e.keyCode === DOWN_ARROW && SearchStore.focusedItemIndex < SearchStore.bookmarksToRender.length) {
            SearchStore.focusedItemIndex = SearchStore.focusedItemIndex + 1;
            RefluxActions.refocus();
        } else if (e.keyCode === UP_ARROW && SearchStore.focusedItemIndex > -1) {
            SearchStore.focusedItemIndex = SearchStore.focusedItemIndex - 1;
            SearchStore.focusedItemIndex === -1 ? this.focus() : RefluxActions.refocus();
        }
    },

    focus: function() {
        if (this.searchBarRef) {
            this.searchBarRef.focus();
        }
    },

    render: function() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="search-input form-control"
                    placeholder="Search for a bookmark..."
                    ref={(ref) => this.searchBarRef = ref}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown} />
            </div>
        );
    }
});
