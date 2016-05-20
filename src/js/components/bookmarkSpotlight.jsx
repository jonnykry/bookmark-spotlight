var React = require('react');
var ReactDOM = require('react-dom');
var classnames = require('classnames');
var RefluxActions = require('../RefluxActions.jsx');
var SearchStore = require('../stores/SearchStore.jsx');
var SearchBar = require('./searchBar.jsx');
var ResultsContainer = require('./resultsContainer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            focusedItemIndex: 0,
            focusedItem: ''
        }
    },

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
                <div className="row search-row">
                    <SearchBar />
                </div>
                <div className="row search-results-row">
                    <ResultsContainer />
                </div>
            </div>
        );
    }
});
