var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

module.exports = React.createClass({
    componentDidMount: function() {
        this.setFocus();
    },

    componentDidUpdate: function() {
        this.setFocus();
    },

    setFocus: function() {
        if (this.props.active) {
            this.searchItemRef.focus();
        }
    },

    render: function() {
        var classes = classNames('list-group-item', {'active': this.props.active});
        return (
                <a href={this.props.url}
                   className={classes}
                   target="_blank"
                   ref={(ref) => this.searchItemRef = ref}
                   onKeyDown={this.props.handleKeyDown}>
                    <span className="list-group-text"><span className="list-group-title">{this.props.title}</span>{' - ' + this.props.url}</span>
                </a>
        );
    }
});
