const Reflux = require('reflux');
const classNames = require('classnames');

const SearchStore = require('../stores/SearchStore.jsx');
const Bookmark = require('./bookmark.jsx');

module.exports = React.createClass({

    mixins: [Reflux.connect(SearchStore, 'onSearch')],

    getInitialState: function() {
        return {
            bookmarkComponents: []
        }
    },

    getBookmarksToRender: function() {
        var bookmarks = SearchStore.bookmarksToRender;
        var result = [];

        if (bookmarks) {
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                result.push(
                    <Bookmark
                        title={bookmark.title}
                        url={bookmark.url} />
                );
            }
        }

        return result;
    },

    render: function() {
        this.getBookmarksToRender();
        return <div className="list-group">{this.getBookmarksToRender()}</div>;
    }

});
