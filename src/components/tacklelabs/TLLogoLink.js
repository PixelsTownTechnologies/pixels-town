import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../images/logo.png";

class TLLogoLink extends React.Component {

    render() {
        return (
            <Link to="/"  style={{top:'2.5%',left:'2.5%',position:'absolute',zIndex:'20'}}>
                <img className="ui bottom  aligned image" alt="logo" src={logo} style={{width:'45px'}} />
                <span style={LOGIN_MENU_TEXT_STYLE}>
                            Tackle
                            <span style={{color: 'white'}}>Labs</span>
                        </span>
            </Link>
        );
    }
}

export const LOGIN_MENU_TEXT_STYLE = {
    color: '#43c5b8',
    fontSize: '2.0em',
    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
    fontStyle: 'normal',
    fontWeight: '900',
    marginLeft:'10px',
};
export default TLLogoLink;