const Reflux = require('reflux');
const RefluxActions = require('../RefluxActions.jsx');

module.exports = Reflux.createStore({

    init: function() {
        this.listenTo(RefluxActions.search, this.onSearch);
        this.listenTo(RefluxActions.renderSearchResults, this.renderSearchResults);

        this.allBookmarkTitles = [];
        this.bookmarksToRender = [];
    },

    onSearch: function(value) {
        if (value.length > 2) {
            const bookmarks = this.allBookmarkTitles;
            for (var i = 0; i < bookmarks.length; i++) {
                if (bookmarks[i].toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    console.log('Rendering SearchItem for: ', bookmarks[i]);
                    this.bookmarksToRender.push(bookmarks[i]);
                    this.trigger(this.bookmarksToRender)
                }
            }
        }
    },

});

