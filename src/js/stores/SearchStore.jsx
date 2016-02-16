const Reflux = require('reflux');
const RefluxActions = require('../RefluxActions.jsx');

module.exports = Reflux.createStore({
    init: function() {
        this.listenTo(RefluxActions.search, this.onSearch);

        this.allBookmarkTitles = [];
        this.bookmarksToRender = [];
    },

    onSearch: function(value) {
        // testing chromes built-in search
        chrome.bookmarks.search(value, this.handleBookmarkSearch);
    },

    handleBookmarkSearch: function(result) {
        this.bookmarksToRender = result;
        this.trigger(this.bookmarksToRender);
    }
});

