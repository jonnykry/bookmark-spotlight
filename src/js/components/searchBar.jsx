const Reflux = require('reflux');
const classnames = require('classnames');

const RefluxActions = require('../RefluxActions.jsx');
const SearchStore = require('../stores/SearchStore.jsx');

const ENTER_KEY_CODE = 13;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            value: '',
            index: 0
        };
    },

    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },

    handleKeyDown: function(e) {
        console.log('searchbar handler bruh');
        if (e.keyCode === ENTER_KEY_CODE) {
            RefluxActions.search(this.state.value);
            this.setState({
                value: ''
            });

            this.searchBarRef.blur();
        }
    },

    render: function() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="search-input form-control"
                    placeholder="Search for..."
                    ref={(ref) => this.searchBarRef = ref}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        );
    }
});
