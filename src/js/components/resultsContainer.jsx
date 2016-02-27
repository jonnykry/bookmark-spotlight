const Reflux = require('reflux');
const classNames = require('classnames');

const SearchStore = require('../stores/SearchStore.jsx');
const SearchItem = require('./searchItem.jsx');

module.exports = React.createClass({
    mixins: [Reflux.connect(SearchStore, 'onSearch', 'onFocusItem')],

    getInitialState: function() {
        return {
            focusedItemIndex: 0
        };
    },

    renderBookmarks: function() {
        var bookmarks = SearchStore.bookmarksToRender;
        var items = [];

        if (bookmarks.length > 0) {
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                items.push(
                    <SearchItem
                        active={this.state.focusedItemIndex === i}
                        title={bookmark.title}
                        url={bookmark.url}
                        hasResults={true}
                        onFocus={this.props.handleOnFocus}
                        onBlur={this.props.handleOnBlur} />
                );
            }
        }

        SearchStore.searchItems = items;
        return items;
    },

    // TODO: Get this keydown handler working
    handleKeyDown: function(e) {
        var index = 0;

        if (e.keyCode === DOWN_ARROW && this.state.focusedItemIndex < SearchStore.bookmarksToRender.length) {
            index = this.state.focusedItemIndex + 1;
            this.setState({
                focusedItemIndex: index
            });
        } else if (e.keyCode === UP_ARROW && this.state.focusedItemIndex > 0) {
            index = this.state.focusedItemIndex - 1;
            this.setState({
                focusedItemIndex: index
            });
        }
    },

    render: function() {
        return <div className="list-group" onKeyDown={this.handleKeyDown}>{this.renderBookmarks()}</div>;
    }
});
