import React from "react";
import StaticMenu from "../../components/others/StaticMenu";
import {Link} from "react-router-dom";
import DropDownItem from "../../components/others/dropList/DropDownItem";
import ImageURL from "../../apis/ImageURL";
import DDImageItem from "../../components/others/dropList/DDImageItem";
import DDLinkItem from "../../components/others/dropList/DDLinkItem";
import UserType from "../../components/operation/UserType";
import {connect} from "react-redux";
import {getUser} from "../../redux/actions/registration";
import {
    PERMISSION_TYPE_HOSPITAL,
    PERMISSION_TYPE_LAB,
    PERMISSION_TYPE_SOFTWARE_COMPANY
} from "../../components/operation/values";
import IDDImageItem from "../../pages/lab/components/IDDImageItem";
import Menu from "./Menu";
import logo from "../../images/logo.png";

class HomeMenu extends React.Component {

    constructor(props) {
        super(props);
        this.props.getUser();
    }

    renderRightLinks = () => {
        return (
            <DropDownItem src={ImageURL + this.props.user.photo}
                          alt="user">
                <div style={{color: "black", width: "250px", fontSize: "1.5em"}}>
                    <DDImageItem to="/account" user={this.props.user}/>
                </div>
                <DDLinkItem to="/account" icon="user circle" text="Account"/>
                <DDLinkItem to="/mail" icon="envelope" text="Mail"/>
                <DDLinkItem to="/logout" icon="sign-out" text="Logout"/>
            </DropDownItem>
        );
    };

    renderRightLinksLab = () => {
        return (
            <DropDownItem src={ImageURL + this.props.user.institution.logo}
                          alt="user">
                <div style={{color: "black", width: "250px", fontSize: "1.5em"}}>
                    <IDDImageItem to="/account"
                                  institution={this.props.user.institution}/>
                </div>
                <DDLinkItem to="/account" icon="user circle" text="User Account"/>
                <DDLinkItem to="/logout" icon="sign-out" text="Logout"/>
            </DropDownItem>
        );
    };

    doctorsLinks = () => {
        const linkList = [];
        linkList.push(<Link to="/model-store" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Model Store</Link>);
        linkList.push(<Link to="/doctor/reports-history" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Reports History</Link>);
        linkList.push(<Link to="/doctor/reports-received" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Reports Received</Link>);
        linkList.push(<Link to="/doctor/create-report" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Create Report</Link>);
        linkList.push(<Link to="/user_model" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Models</Link>);
        linkList.push(<div className="right menu">{this.renderRightLinks()}</div>);
        return linkList;
    };

    patientsLinks = () => {
        const linkList = [];
        linkList.push(<Link to="/model-store" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Model Store</Link>);
        linkList.push(<Link to="/patient/reports" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>My Reports</Link>);
        linkList.push(<Link to="/user_model" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>My models</Link>);
        linkList.push(
            <div className="right menu">
                {this.renderRightLinks()}
            </div>
        );
        return linkList;
    };

    supervisorLinks = () => {
        const linkList = [];
        if (this.props.user.institution !== undefined) {
            if (this.props.user.institution.type.type === PERMISSION_TYPE_LAB) {
                linkList.push(<Link to="/model-store" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Model Store</Link>);
                linkList.push(<Link to="/lab/create-report" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Create Report</Link>);
                linkList.push(<Link to="/lab/view-reports" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>View Reports</Link>);
                linkList.push(<Link to="/user_model" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Lab models</Link>);
                linkList.push(
                    <div className="right menu">
                        {this.renderRightLinksLab()}
                    </div>
                );
                return linkList;
            } else if (this.props.user.institution.type.type === PERMISSION_TYPE_HOSPITAL) {
                linkList.push(<Link to="/model-store" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Model Store</Link>);
                linkList.push(<Link to="/hospital" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Request Join</Link>);
                linkList.push(<Link to="/user_model" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Hospital models</Link>);
                linkList.push(<Link to="/hospital" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Models</Link>);
            }
        } else {
            linkList.push(<Link to="/create-lab" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Create Lab</Link>);
            linkList.push(<Link to="/create-hospital" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Create Hospital</Link>);
        }
        linkList.push(<div className="right menu">{this.renderRightLinks()}</div>);
        return linkList;
    };

    developerLinks = () => {
        const linkList = [];
        if (this.props.user.institution !== undefined) {
            if (this.props.user.institution.type.type === PERMISSION_TYPE_SOFTWARE_COMPANY) {
                linkList.push(<Link to="/developer/add-model" className="item"  style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Add Models</Link>);
                linkList.push(<Link to="/developer/company_model" className="item"  style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Company Models</Link>);
                linkList.push(
                    <div className="right menu">
                        {this.renderRightLinksLab()}
                    </div>
                );
                return linkList;
            }
        } else {
            linkList.push(<Link to="/create-software-company" className="item"  style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Create Company</Link>);
        }
        linkList.push(<div className="right menu">{this.renderRightLinks()}</div>);
        return linkList;
    };

    noneLinks = () => {
        const linkList = [];
        linkList.push(<Link to="#" className="item"  style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Support</Link>);
        linkList.push(<Link to="#" className="item"  style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>About</Link>);
        linkList.push(<Link to="#" className="item"  style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Help</Link>);
        linkList.push(
            <div className="right menu">
                <Link to="/login" className="item" style={{color: "#fff",fontSize:"1.15em",marginTop:"5px"}}>Login</Link>
                <div className="item">
                    <Link to="/sign-up" className="ui inverted button"  style={{fontSize:"1.15em",marginTop:"5px"}}>
                        Sign-up
                    </Link>
                </div>
            </div>
        );
        return linkList;
    };

    renderLinks = () => {
        return <UserType
            asFunction={true}
            doctor={
                this.doctorsLinks
            }
            patient={
                this.patientsLinks
            }
            supervisor={
                this.supervisorLinks
            }
            developer={
                this.developerLinks
            }
            none={
                this.noneLinks()
            }
        />
    };

    renderMenu = () => {
        return (
            <div className="ui secondary fixed menu" style={{background: "#49214d", color: "#fff"}}>
                <div className="ui container">
                    <Link to="/" className="item" style={{color: "#fff",fontSize:"1em"}}>
                        <img className="logo-menu" src={logo} alt="logo"/>
                        <div className="logo-name-first-part">Tackle</div>
                        <div className="logo-name-second-part">Labs</div>
                    </Link>
                    {this.renderLinks()}
                </div>
            </div>
        );
    };

    render() {
        return this.renderMenu();
    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser})(HomeMenu);