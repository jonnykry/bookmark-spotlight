var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var classNames = require('classnames');
var RefluxActions = require('../RefluxActions.jsx');
var SearchStore = require('../stores/SearchStore.jsx');
var SearchItem = require('./searchItem.jsx');

var DOWN_ARROW = 40;
var UP_ARROW = 38;

module.exports = React.createClass({
    mixins: [Reflux.connect(SearchStore, 'onSearch', 'onRefocus')],

    handleKeyDown: function(e) {
        if (e.keyCode === DOWN_ARROW && SearchStore.focusedItemIndex < SearchStore.bookmarksToRender.length - 1) {
            SearchStore.focusedItemIndex = SearchStore.focusedItemIndex + 1;
            RefluxActions.refocus();
        } else if (e.keyCode === UP_ARROW && SearchStore.focusedItemIndex > -1) {
            SearchStore.focusedItemIndex = SearchStore.focusedItemIndex - 1;
            SearchStore.focusedItemIndex === -1 ? RefluxActions.focusSearchBar() : RefluxActions.refocus();
        }
    },

    renderBookmarks: function() {
        var bookmarks = SearchStore.bookmarksToRender;
        var items = [];

        if (bookmarks.length > 0) {
            // Set an arbitrary limit to the number of items
            var maxItems = bookmarks.length > 50 ? 50 : bookmarks.length;
            for (var i = 0; i < maxItems; i++) {
                var bookmark = bookmarks[i];

                // Bookmarks without URLs are Folders
                if (bookmark.url) {
                    items.push(
                        <SearchItem
                            active={SearchStore.focusedItemIndex === i}
                            handleKeyDown={this.handleKeyDown}
                            tabIndex={i + 1}
                            title={bookmark.title}
                            parentId={bookmark.parentId}
                            url={bookmark.url}
                            hasResults={true}/>
                    );
                }
            }

            SearchStore.searchItems = items;
        }

        if (SearchStore.hasSearched && SearchStore.bookmarksToRender.length === 0) {
            items = <div className="list-group-item">No Results Found</div>;
        }

        return items;
    },

    render: function() {
        return <div className="list-group">{this.renderBookmarks()}</div>;
    }
});
