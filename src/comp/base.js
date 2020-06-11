import React from "react";
import {Validator} from "./validators";
import ReactDOM from "react-dom";

export class BaseComponent extends React.Component {
    validators = [];
    validator = new Validator();
    wrapper;

    constructor(props) {
        super(props);
        this.validator.setValidators(props.validators);
    }

    loadTheme() {
        if (this.props.theme)
            return this.props.theme;
        if (this.state && this.state.theme)
            return this.state.theme;
        throw Error("loadTheme method not implement in " + this.constructor.name + " Component");
    };

    show(theme) {
        return null;
    }

    hide(theme) {
        return null;
    }

    handleClickOutside = (event) => {
        if (this.wrapper && !this.wrapper.contains(event.target)) {
            this.validator.hover = false;
        } else {
            this.validator.active = this.validator.touch;
            this.validator.touch = true;
            this.validator.hover = true;
        }
        if (this.props.clickOutside) {
            this.props.clickOutside(this.validator);
        } else if (this.clickOutside) {
            this.clickOutside(this.validator);
        }
    };

    componentDidMount = () => {
        this.wrapper = ReactDOM.findDOMNode(this);
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    onChange = (event) => {
        this.validator.validate(event.target.value);
        if (this.props.change)
            this.props.change(event.target.value, this.validator);

    };

    onClick = (event) => {
        this.validator.validate(event.target.value);
        if (this.props.click)
            this.props.click(event, this.validator);
    };

    render() {
        if (this.props.if === undefined || this.props.if) {
            return this.show(this.loadTheme());
        } else {
            return this.hide(this.loadTheme());
        }
    }

}

export class BaseBlock extends React.Component {
    loadTheme() {
        if (this.props.theme)
            return this.props.theme;
        if (this.state && this.state.theme)
            return this.state.theme;
        throw Error("loadTheme method not implement in " + this.constructor.name + " Component");
    };

    show(theme) {
        return null;
    }

    hide(theme) {
        return null;
    }

    render() {
        if (this.props.if === undefined || this.props.if) {
            return this.show(this.loadTheme());
        } else {
            return this.hide(this.loadTheme());
        }
    }

}