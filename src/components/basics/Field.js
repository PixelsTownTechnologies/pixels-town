import React from 'react';

class Field extends React.Component {

    is_required = () => {
        if (this.props.required) {
            return "required";
        }
    };

    render() {
        return (
            <div className={"ui "+this.is_required()+" field"}>
                {this.props.label}
                {this.props.field}
                {this.props.children}
            </div>
        );
    }
}

export default Field;