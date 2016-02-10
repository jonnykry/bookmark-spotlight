const classNames = require('classnames');

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
        console.log('Search term: ', this.state.value);
    },

    handleClick: function() {
        console.log('Searching Bookmarks!', this.props.bookmarks);
    },

    render: function() {
        return (
            <div className="col-lg-6">
                <div className="input-group">
                    <input
                        type="text" className="search-input form-control"
                        placeholder="Search for..."
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.handleClick}>Go!</button>
                    </span>
                </div>
            </div>
        );
    }

});
