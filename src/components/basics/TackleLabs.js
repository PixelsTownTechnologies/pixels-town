import React from "react";
import logo from "../../images/logo.png";
import {LOGIN_MENU_TEXT_STYLE} from "../../values/Styles";

class Field extends React.Component {

    render() {
        return (
            <div>
                <img className="ui bottom aligned image" alt="logo" src={logo}/>
                <span style={LOGIN_MENU_TEXT_STYLE}>
                 Tackle
            <span style={{color: 'white'}}>Labs</span>
                </span>
            </div>
        );
    }
}

export default Field;