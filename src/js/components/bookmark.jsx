const classNames = require('classnames');

module.exports = React.createClass({

    render: function() {
        console.log('Rendering bookmark');
        return (
                <a href={this.props.url} className="list-group-item" target="_blank">{this.props.title}</a>
        );
    }

});
