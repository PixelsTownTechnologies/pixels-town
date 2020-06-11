import React from 'react';
import logo from '../../images/logo.png';
import '../../styles/Menu.css';
import {Link} from "react-router-dom";

class Menu extends React.Component {

    state = {
        hidden: null,
    };

    componentDidMount() {
        this.setState({hidden: this.props.hidden});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({hidden: nextProps.hidden});
    }

    renderMenuClasses = () => {
        if (this.state.hidden) {
            return "ui inverted top pointing fixed menu transition hidden";
        } else if (!this.state.hidden) {
            return "ui inverted top pointing fixed menu transition visible";
        }
    };

    render() {
        return (
            <div className={this.renderMenuClasses()}>
                <div className="ui container">
                    <Link to="/" className="item">
                        <img className="logo-menu" src={logo} alt="logo"/>
                        <div className="logo-name-first-part">Tackle</div>
                        <div className="logo-name-second-part">Labs</div>
                    </Link>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Menu;
