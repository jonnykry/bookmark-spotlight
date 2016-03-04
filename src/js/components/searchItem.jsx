const classNames = require('classnames');

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

    _getSubtext: function() {
        var text = '';
        var spanClass = 'list-group-text';
        var title = <span className="list-group-title">{this.props.title}</span>;
        if (this.props.url && this.props.parentId) {
            text = ' - ' + this.props.url + ' - ' + this.props.parentId + ')';
            return <span className={spanClass}>{title}{text}</span>;
        } else if (this.props.url) {
            text = ' - ' + this.props.url + ')';
            return <span className={spanClass}>{text}</span>;
        } else if (this.props.parentId) {
            text = ' - ' + this.props.parentId + ')';
            return <span className={spanClass}>{text}</span>;
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
                    {this._getSubtext()}
                </a>
        );
    }
});
