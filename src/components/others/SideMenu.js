import React from 'react';
import logo from '../../images/logo.png';
import '../../styles/Menu.css';
import {Link} from "react-router-dom";
import {LOGIN_MENU_TEXT_STYLE} from "../../values/Styles";

class SideMenu extends React.Component {

    state = {
        hidden: true,
    };

    componentDidMount() {
        this.setState({hidden: this.props.hidden});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({hidden: nextProps.hidden});
    }

    renderMenuClasses = () => {
        if (this.state.hidden) {
            return "ui left fixed vertical menu inverted transition hidden";
        } else if (!this.state.hidden) {
            return "ui left fixed vertical menu inverted  transition visible";
        }
    };

    render() {
        return (
            <div className={this.renderMenuClasses()}>
                <div className="ui container" onClick={this.props.backAction}>
                    <Link to="#" className="item">
                        <i className="angle double left icon"
                           style={{width: '50%', marginRight: '25%', marginLeft: '25%'}}/>
                    </Link>
                    <Link to="/" className="item">
                        <img className="ui bottom aligned mini image" alt="logo" src={logo}/>
                        <span style={LOGIN_MENU_TEXT_STYLE}>
                            Tackle
                            <span style={{color: 'white'}}>Labs</span>
                        </span>
                    </Link>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SideMenu;
