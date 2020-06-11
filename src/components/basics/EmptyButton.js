import React from 'react';

class EmptyButton extends React.Component {

    render() {
        return (
            <button className="ui inverted secondary button" {...this.props}> {this.props.text}</button>
        );
    }
}

export default EmptyButton;