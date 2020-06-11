import React from 'react';
import Field from "./Field";

class TextField extends React.Component {


    render() {
        return (
            <Field required={this.props.required}>
                <label>{this.props.label}</label>
                <input type="text" autoComplete={this.props.autoComplete} placeholder={this.props.placeholder} {...this.props}/>
            </Field>
        );
    }
}

export default TextField;