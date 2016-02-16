const Reflux = require('reflux');
const RefluxActions = require('../RefluxActions.jsx');

module.exports = Reflux.createStore({

    init: function() {
        this.listenTo(RefluxActions.search, this.onSearch);
        // this.listenTo(RefluxActions.renderSearchResults, this.renderSearchResults);

        this.allBookmarkTitles = [];
        this.bookmarksToRender = [];
    },

    onSearch: function(value) {
        // testing chromes built-in search
        chrome.bookmarks.search(value, this.handleBookmarkSearch);
    },

    handleBookmarkSearch: function(result) {
        console.log('Should trigger bookmark', result);
        this.bookmarksToRender = result;
        this.trigger(this.bookmarksToRender);
    }

});

