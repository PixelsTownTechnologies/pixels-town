import React from 'react';

class Field extends React.Component {

    render() {
        return (
            <div className="ui segment" style={this.props.bodyStyle}>
                <form className="ui form" {...this.props}>
                    {this.props.children}
                </form>
            </div>
        );
    }
}

export default Field;