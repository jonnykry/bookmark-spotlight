const Reflux = require('reflux');
const classNames = require('classnames');

const SearchStore = require('../stores/SearchStore.jsx');
const Bookmark = require('./bookmark.jsx');

const DOWN_ARROW = 40;
const UP_ARROW = 38;

module.exports = React.createClass({
    mixins: [Reflux.connect(SearchStore, 'onSearch')],

    getInitialState: function() {
        return {
            index: 0
        }
    },

    onKeyDown: function(e) {
        const stateIndex = this.state.index;

        if (e.keyCode === DOWN_ARROW && stateIndex < SearchStore.bookmarksToRender.length) {
            console.log('incrementing index');
            const index = stateIndex + 1;
            this.setState({
                index: index
            });
        } else if (e.keyCode === UP_ARROW && stateIndex > 0) {
            console.log('decrementing index');
            const index = stateIndex - 1;
            this.setState({
                index: index
            });
        }
    },

    getBookmarksToRender: function() {
        var bookmarks = SearchStore.bookmarksToRender;
        var result = [];

        if (bookmarks.length > 0) {
            for (var i = 0; i < bookmarks.length; i++) {
                var bookmark = bookmarks[i];
                result.push(
                    <Bookmark
                        active={this.state.index === i}
                        title={bookmark.title}
                        url={bookmark.url}
                        hasResults={true}
                        onKeyDown={this.onKeyDown} />
                );
            }
        }
        return result;
    },

    render: function() {
        return <div className="list-group">{this.getBookmarksToRender()}</div>;
    }
});
