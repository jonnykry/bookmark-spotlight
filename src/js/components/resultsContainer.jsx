const Reflux = require('reflux');
const classNames = require('classnames');

const SearchStore = require('../stores/SearchStore.jsx');
const SearchItem = require('./searchItem.jsx');

const DOWN_ARROW = 40;
const UP_ARROW = 38;

module.exports = React.createClass({
    mixins: [Reflux.connect(SearchStore, 'onSearch', 'onFocusItem')],

    getInitialState: function() {
        return {
            focusedItemIndex: 0
        };
    },

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

    renderBookmarks: function() {
        var bookmarks = SearchStore.bookmarksToRender;
        var items = [];

        if (bookmarks.length > 0) {
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                items.push(
                    <SearchItem
                        active={this.state.focusedItemIndex === i}
                        handleKeyDown={this.handleKeyDown}
                        tabIndex={i + 1}
                        title={bookmark.title}
                        url={bookmark.url}
                        hasResults={true} />
                );
            }
        }

        SearchStore.searchItems = items;
        return items;
    },


    render: function() {
        return <div className="list-group">{this.renderBookmarks()}</div>;
    }
});
