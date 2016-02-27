const classNames = require('classnames');

module.exports = React.createClass({

    render: function() {
        var classes = classNames('list-group-item', {'active': this.props.active});
        return (
                <a href={this.props.url} className={classes} target="_blank">{this.props.title}</a>
        );
    }
});
