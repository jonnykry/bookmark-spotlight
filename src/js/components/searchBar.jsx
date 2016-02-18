const Reflux = require('reflux');
const classnames = require('classnames');

const RefluxActions = require('../RefluxActions.jsx');

const ENTER_KEY_CODE = 13;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            value: ''
        }
    },

    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },

    handleClick: function() {
        RefluxActions.search(this.state.value);
        this.setState({
            value: ''
        })
    },

    handleKeyDown: function(e) {
        if (e.keyCode === ENTER_KEY_CODE) {
            RefluxActions.search(this.state.value);
            this.setState({
                value: ''
            })
        }
    },

    render: function() {
        return (
            <div className="input-group">
                <input
                    type="text" className="search-input form-control"
                    placeholder="Search for..."
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        );
    }
});
