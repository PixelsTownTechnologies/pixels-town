import React from "react";
import StaticMenu from "../components/others/StaticMenu";
import {Link} from "react-router-dom";
import DropDownItem from "../components/others/dropList/DropDownItem";
import ImageURL from "../apis/ImageURL";
import DDImageItem from "../components/others/dropList/DDImageItem";
import DDLinkItem from "../components/others/dropList/DDLinkItem";
import UserType from "../components/operation/UserType";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/registration";
import {
    PERMISSION_TYPE_HOSPITAL,
    PERMISSION_TYPE_LAB,
    PERMISSION_TYPE_SOFTWARE_COMPANY
} from "../components/operation/values";
import IDDImageItem from "./lab/components/IDDImageItem";

class UserMenu extends React.Component {

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
        linkList.push(<Link to="/model-store" className="item">Model Store</Link>);
        linkList.push(<Link to="/doctor/reports-history" className="item">Reports History</Link>);
        linkList.push(<Link to="/doctor/reports-received" className="item">Reports Received</Link>);
        linkList.push(<Link to="/doctor/create-report" className="item">Create Report</Link>);
        linkList.push(<Link to="/user_model" className="item">Models</Link>);
        linkList.push(<div className="right menu">{this.renderRightLinks()}</div>);
        /*if(this.props.user.join_institution !== undefined){
            <Link to="/doctor/create-report" className="item">Create Report</Link>
        }*/
        return linkList;
    };

    patientsLinks = () => {
        const linkList = [];
        linkList.push(<Link to="/model-store" className="item">Model Store</Link>);
        linkList.push(<Link to="/patient/reports" className="item">My Reports</Link>);
        linkList.push(<Link to="/user_model" className="item">My models</Link>);
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
                linkList.push(<Link to="/model-store" className="item">Model Store</Link>);
                linkList.push(<Link to="/lab/create-report" className="item">Create Report</Link>);
                linkList.push(<Link to="/lab/view-reports" className="item">View Reports</Link>);
                linkList.push(<Link to="/user_model" className="item">Lab models</Link>);
                linkList.push(
                    <div className="right menu">
                        {this.renderRightLinksLab()}
                    </div>
                );
                return linkList;
            } else if (this.props.user.institution.type.type === PERMISSION_TYPE_HOSPITAL) {
                linkList.push(<Link to="/model-store" className="item">Model Store</Link>);
                linkList.push(<Link to="/hospital" className="item">Request Join</Link>);
                linkList.push(<Link to="/user_model" className="item">Hospital models</Link>);
                linkList.push(<Link to="/hospital" className="item">Models</Link>);
            }
        } else {
            linkList.push(<Link to="/create-lab" className="item">Create Lab</Link>);
            linkList.push(<Link to="/create-hospital" className="item">Create Hospital</Link>);
        }
        linkList.push(<div className="right menu">{this.renderRightLinks()}</div>);
        return linkList;
    };

    developerLinks = () =>{
        const linkList = [];
        if (this.props.user.institution !== undefined) {
            if (this.props.user.institution.type.type === PERMISSION_TYPE_SOFTWARE_COMPANY) {
                linkList.push(<Link to="/developer/add-model" className="item">Add Models</Link>);
                linkList.push(<Link to="/developer/company_model" className="item">Company Models</Link>);
                linkList.push(
                    <div className="right menu">
                        {this.renderRightLinksLab()}
                    </div>
                );
                return linkList;
            }
        } else {
            linkList.push(<Link to="/create-software-company" className="item">Create Company</Link>);
        }
        linkList.push(<div className="right menu">{this.renderRightLinks()}</div>);
        return linkList;
    };

    noneLinks = () => {
        const linkList = [];
        linkList.push(<Link to="/about" className="item">About</Link>);
        linkList.push(<Link to="/help" className="item">Help</Link>);
        linkList.push(
            <div className="right menu">
                <Link to="/login" className="item">Login</Link>
                <div className="item">
                    <Link to="/sign-up" className="ui inverted button">
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
            <StaticMenu hidden={false}>
                {this.renderLinks()}
            </StaticMenu>
        );
    };

    render() {
        return this.renderMenu();
    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser})(UserMenu);