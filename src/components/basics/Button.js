import React from 'react';

class Button extends React.Component {

    renderClasses = () => {
        if (this.props.disabled) {
            return "ui teal button";
        } else {
            return "ui teal button";
        }
    };

    render() {
        return (
            <button className={this.renderClasses()} {...this.props}>{this.props.text}</button>
        );
    }
}

export default Button;