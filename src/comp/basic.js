import React from "react";
import {EmailValidator, NumberValidator, StringValidator} from "./validators";
import {BaseComponent} from "./base";
import './styles.css';

export const ButtonThemes = {
    basic: "ui button",
    positive: "ui positive button",
    negative: "ui negative button",
    red: "ui red button",
    orange: "ui orange button",
    yellow: "ui yellow button",
    olive: "ui olive button",
    green: "ui green button",
    teal: "ui teal button",
    blue: "ui blue button",
    violet: "ui violet button",
    purple: "ui purple button",
    brown: "ui brown button",
    grey: "ui grey button",
    black: "ui black button",
};

export const ToggleButtonThemes = {
    unActive: "ui toggle button",
    active: "ui toggle button active",
};

export const SearchInputThemes = {
    basic: "ui input",
    loading: "ui left icon input loading",
};

export const NumberInputThemes = {
    basic: "ui input",
    error: "ui input error"
};

export const StringInputThemes = {
    basic: "ui input",
    error: "ui input error"
};

export const EmailInputTheme = {
    basic: {theme: "ui icon input", icon: "user circle icon"},
    error: {theme: "ui icon input error", icon: "user circle icon"},
};

export class Button extends BaseComponent {

    state = {
        theme: ButtonThemes.basic
    };

    show(theme) {
        return (
            <button className={theme}>{this.props.text}</button>
        );
    }
}

export class ToggleButton extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        };
    }

    loadTheme() {
        return this.state.isActive ? ToggleButtonThemes.active : ToggleButtonThemes.unActive;
    }

    activeChange = () => {
        if (this.props.change)
            this.props.change(!this.state.isActive);
        this.setState({isActive: !this.state.isActive});
    };

    show(theme) {
        return (
            <button
                className={theme}
                onClick={this.activeChange}
            >
                {this.props.text}
            </button>
        );
    }
}

export class SearchInput extends BaseComponent {

    state = {
        value: this.props.value ? this.props.value : ""
    };

    loadTheme() {
        return this.props.loading ? {
            theme: SearchInputThemes.loading,
            icon: "search icon"
        } : {theme: SearchInputThemes.basic, icon: ""};
    };

    show(theme) {
        return (
            <div className={theme.theme}>
                <input type="text" placeholder="Search..."
                       value={this.state.value}
                       onChange={this.onChange}
                       onClick={this.onClick}
                       required={this.props.required}
                       disabled={this.props.disable}
                />
                <i className={theme.icon}/>
            </div>
        );
    }

}

export class NumberInput extends BaseComponent {

    numberOfDigits;

    state = {
        value: this.props.value ?
            ((parseFloat(this.props.value) <= (this.props.max ? parseFloat(this.props.max) : 9999999999999)
                && parseFloat(this.props.value) >= (this.props.min ? parseFloat(this.props.min) : 0)) ?
                parseFloat(this.props.value) : 0)
            : (this.props.min ? parseFloat(this.props.min) : 0)
    };

    loadTheme() {
        return this.validator.valid ? NumberInputThemes.basic : NumberInputThemes.error;
    };

    onChange = (event) => {
        this.validator.validate(event.target.value);
        const validInput = Object.getOwnPropertyNames(NumberValidator.isValid(event.target.value)).length === 0;
        if (validInput) {
            const min = this.props.min ? parseFloat(this.props.min) : 0;
            const max = this.props.max ? parseFloat(this.props.max) : 9999999999999;
            const newValue = parseFloat(event.target.value);
            if (newValue <= max && newValue >= min) {
                this.setState({value: parseFloat(event.target.value)});
                if (this.props.change) {
                    this.props.change(parseFloat(event.target.value), this.validator);
                }
            }
        }


    };

    increment = () => {
        const max = this.props.max ? parseFloat(this.props.max) : 9999999999999;
        const value = this.state.value;
        const step = this.props.step ? parseFloat(this.props.step) : 1;
        if (value < max) {
            this.validator.validate((value + step <= max ? value + step : max) + "");
            this.setState({
                value: value + step <= max ? value + step : max
            })
        }
    };

    decrement = () => {
        const min = this.props.min ? parseFloat(this.props.min) : 0;
        const value = this.state.value;
        const step = this.props.step ? parseFloat(this.props.step) : 1;
        if (value > min) {
            this.validator.validate((value - step >= min ? value - step : min) + "");
            this.setState({
                value: value - step >= min ? value - step : min
            })
        }
    };

    show(theme) {
        return (
            <div className={theme}>
                <input
                    type="text"
                    value={this.state.value.toFixed(this.props.numberOfDigits ? this.props.numberOfDigits : 2)}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    required={this.props.required}
                    disabled={this.props.disable}
                    style={{borderRadius: "6px 0px 0px 6px"}}
                />
                <div className="ui vertical icon buttons">
                    <button className="ui icon button" onClick={this.increment}
                            style={{borderRadius: "0px 6px 0px 0px"}}>
                        <i className="angle up icon"/>
                    </button>
                    <button className="ui icon button" onClick={this.decrement}
                            style={{borderRadius: "0px 0px 6px 0px"}}>
                        <i className="angle down icon"/>
                    </button>
                </div>
            </div>
        );
    }

}

export class StringInput extends BaseComponent {

    state = {
        value: this.props.value ? this.props.value : ""
    };

    loadTheme() {
        return this.validator.valid ? NumberInputThemes.basic : NumberInputThemes.error;
    };

    onChange = (event) => {
        this.validator.validate(event.target.value);
        const validInput = Object.getOwnPropertyNames(StringValidator.isValid(event.target.value)).length === 0;
        if (validInput) {
            this.setState({value: event.target.value});
            if (this.props.change) {
                this.props.change(event.target.value, this.validator);
            }
        }
    };

    show(theme) {
        return (
            <div className={theme}>
                <input
                    type="text"
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    required={this.props.required}
                    disabled={this.props.disable}
                />
            </div>
        );
    }

}

export class TextInput extends BaseComponent {

    state = {
        value: this.props.value ? this.props.value : ""
    };

    loadTheme() {
        return this.validator.valid ? NumberInputThemes.basic : NumberInputThemes.error;
    };

    onChange = (event) => {
        this.validator.validate(event.target.value);
        this.setState({value: event.target.value});
        if (this.props.change) {
            this.props.change(event.target.value, this.validator);
        }
    };

    show(theme) {
        return (
            <div className={theme}>
                <input
                    type="text"
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    required={this.props.required}
                    disabled={this.props.disable}
                />
            </div>
        );
    }

}

export class PasswordInput extends BaseComponent {

    state = {
        passwordType: true,
        value: this.props.value ? this.props.value : ""
    };

    onChange = (event) => {
        this.validator.validate(event.target.value);
        this.setState({value: event.target.value});
        if (this.props.change) {
            this.props.change(event.target.value, this.validator);
        }
    };

    loadTheme() {
        return this.state.passwordType ? {
            theme: "ui icon input" + (!this.validator.valid ? " error" : ""),
            icon: "eye slash link icon",
            type: "password"
        } : {
            theme: "ui icon input" + (!this.validator.valid ? " error" : ""),
            icon: "eye link icon",
            type: "text"
        };
    }

    onClickPasswordType = () => {
        this.setState({passwordType: !this.state.passwordType});
    };

    show(theme) {
        return (
            <div className={theme.theme}>
                <input type={theme.type}
                       name="password"
                       autoComplete="off"
                       placeholder="password"
                       value={this.state.value}
                       onChange={this.onChange}
                       onClick={this.onClick}
                       required={this.props.required}
                       disabled={this.props.disable}
                />
                <i className={theme.icon} onClick={this.onClickPasswordType}/>
            </div>
        );
    }
}

export class EmailInput extends BaseComponent {

    state = {
        value: this.props.value ? this.props.value : ""
    };

    constructor(props) {
        super(props);
        this.validator.__validators = [...this.validator.__validators, EmailValidator];
    }

    loadTheme() {
        return !(!this.validator.valid && this.validator.value)
            ? EmailInputTheme.basic : EmailInputTheme.error;
    };

    onChange = (event) => {
        this.validator.validate(event.target.value);
        this.setState({value: event.target.value});
        if (this.props.change) {
            this.props.change(event.target.value, this.validator);
        }
    };

    show(theme) {
        return (
            <div className={theme.theme}>
                <i className={theme.icon}/>
                <input
                    type="text"
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    required={this.props.required}
                    disabled={this.props.disable}
                />
            </div>
        );
    }

}

export class Dropdown extends BaseComponent {

    state = {
        active: false,
        selectedValue: undefined,
    };

    loadTheme() {
        if (this.state.selectedValue) {
            return this.state.active ?
                {
                    theme: "ui selection dropdown active visible",
                    value: "text",
                    menu: "menu transition visible",
                    style: {}
                } :
                {
                    theme: "ui selection dropdown",
                    value: "text",
                    menu: "menu transition hidden",
                    style: {display: "block !important"}
                };
        } else {
            return this.state.active ?
                {
                    theme: "ui selection dropdown active visible",
                    value: "default text",
                    menu: "menu transition visible",
                    style: {}
                } :
                {
                    theme: "ui selection dropdown",
                    value: "default text",
                    menu: "menu transition hidden",
                    style: {display: "block !important"}
                };
        }
    }

    onClick = (event) => {
        this.setState({active: !this.state.active});
    };

    change = (item) => {
        this.setState({selectedValue: item});
        if (this.props.change)
            this.props.change(item);
    };

    renderDataList = () => {
        return this.props.dataList.map((item, index) => {
                return <div
                    key={index}
                    className="item"
                    data-value={item.id}
                    onClick={() => this.change(item)}
                >
                    {item.value}
                </div>
            }
        );
    };

    show(theme) {
        const name = this.props.name ? this.props.name : "";
        const selectedValue = this.state.selectedValue ? this.state.selectedValue.value : undefined;
        return (
            <div className={theme.theme} onClick={this.onClick}>
                <input type="hidden" name={name}
                       required={this.props.required}
                       disabled={this.props.disable}
                       value={selectedValue ? selectedValue.id : undefined}
                />
                <i className="dropdown icon"/>
                <div className={theme.value}>{selectedValue ? selectedValue : name}</div>
                <div className={theme.menu} style={theme.style}>
                    {this.renderDataList()}
                </div>
            </div>
        );
    }

}

export class ToggleCheckBox extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active ? this.props.active : false,
        };
    }

    loadTheme() {
        return {theme: "ui toggle checkbox", checked: this.state.active ? "checked" : ""};
    }

    onChangeHandler = (event) => {
        if (this.props.change) {
            this.props.change(!this.state.active);
        }
        this.setState({active: !this.state.active});
    };


    show(theme) {
        return (
            <div className={theme.theme}>
                <input type="checkbox" name="public" onChange={this.onChangeHandler} checked={theme.checked}/>
                <label>{this.props.text}</label>
            </div>
        );
    }

}
