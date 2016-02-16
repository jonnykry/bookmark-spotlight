const classnames = require('classnames');

const SearchStore = require('../stores/SearchStore.jsx');
const SearchBar = require('./searchBar.jsx');
const SearchItems = require('./searchItems.jsx');

module.exports = React.createClass({
    componentDidMount: function() {
        chrome.bookmarks.getTree(this.populateBookmarkDictionary);
    },

    populateBookmarkDictionary: function(bookmarks) {
        for (var i = 0; i < bookmarks.length; i++) {
            var bookmark = bookmarks[i];
            if (bookmark.url) {
                var tempArr = SearchStore.allBookmarkTitles.slice();
                tempArr.push(bookmark.title);
                SearchStore.allBookmarkTitles = tempArr;
            }

            if (bookmark.children) {
                this.populateBookmarkDictionary(bookmark.children);
            }
        }
    },

    render: function() {

        return (
            <div className="container">
                <div className="row searchRow">
                    <SearchBar />
                </div>
                <div className="row">
                    <SearchItems />
                </div>
            </div>
        );
    }
});

