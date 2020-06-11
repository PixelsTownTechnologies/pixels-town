import React from 'react';

export class Form extends React.Component {

    render() {
        return (
            <form
                className="ui form"
                {...this.props}
                onSubmit={
                    (event) => {
                        event.preventDefault();
                        this.props.onSubmit ? this.props.onSubmit(event) : undefined;
                    }
                }
            >
                {this.props.children}
            </form>
        );
    }
}

export class Field extends React.Component {
    render() {
        return (
            <div className="field" {...this.props}>
                <label>{this.props.name}</label>
                {this.props.children}
            </div>
        );
    }
}
