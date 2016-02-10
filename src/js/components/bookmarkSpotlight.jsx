var classNames = require('classnames');
var SearchBar = require('./searchBar.jsx');
var SearchItems = require('./searchItems.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            bookmarks: []
        };
    },

    componentDidMount: function() {
        chrome.bookmarks.getTree(this.populateBookmarkDictionary);
    },

    populateBookmarkDictionary: function(result) {
        console.log('Setting up Bookmarks');
        this.setState({
            bookmarks: result
        });
    },

    render: function() {

        return (
            <div className="container">
                <div className="row">
                    <SearchBar bookmarks={this.state.bookmarks} />
                </div>
                <div className="row">
                    <SearchItems />
                </div>
            </div>
        );
    }

});

