const Reflux = require('reflux');
const RefluxActions = require('../RefluxActions.jsx');

module.exports = Reflux.createStore({
    init: function() {
        this.listenTo(RefluxActions.search, this.onSearch);
        this.listenTo(RefluxActions.refocus, this.onRefocus);
        this.listenTo(RefluxActions.focusSearchBar, this.onFocusSearchBar);

        this.allBookmarkTitles = [];
        this.bookmarksToRender = [];
        this.focusedItemIndex = -1; // default to input
        this.forceSeachBarFocus = false;
        this.hasSearched = false;
    },

    onSearch: function(value) {
        // testing chromes built-in search
        chrome.bookmarks.search(value, this.handleBookmarkSearch);
        this.hasSearched = true;
    },

    onRefocus: function() {
        this.trigger();
    },

    handleBookmarkSearch: function(result) {
        this.bookmarksToRender = result;
        this.trigger(this.bookmarksToRender);
    },

    onFocusSearchBar: function() {
        this.forceSeachBarFocus = true;
        this.trigger();
    }

});

