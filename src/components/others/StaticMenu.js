import React from 'react';
import logo from '../../images/logo.png';
import '../../styles/Menu.css';
import {Link} from "react-router-dom";

class StaticMenu extends React.Component {

    renderURL = ()=>{
        if(this.props.to === undefined){
            return "/";
        }else {
            return this.props.to;
        }
    };

    render() {
        return (
            <div className="ui inverted top pointing fixed menu">
                <Link to={this.renderURL()} className="item">
                    <img className="logo-menu" src={logo} alt="logo"/>
                    <div className="logo-name-first-part">Tackle</div>
                    <div className="logo-name-second-part">Labs</div>
                </Link>
                {this.props.children}
            </div>
        );
    }
}

export default StaticMenu;
