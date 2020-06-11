import React from 'react';
import {Link, Redirect} from "react-router-dom";
import StaticMenu from "../../components/others/StaticMenu";
import Authenticate from "../../components/operation/Authenticate";
import DropDownItem from "../../components/others/dropList/DropDownItem";
import DDLinkItem from "../../components/others/dropList/DDLinkItem";
import IDDImageItem from "./components/IDDImageItem";
import ImageURL from "../../apis/ImageURL";
import Column from "../../components/layout/Column";
import Grid from "../../components/layout/Grid";
import Row from "../../components/layout/Row";
import UserType from "../../components/operation/UserType";
import {PERMISSION_TYPE_LAB} from "../../components/operation/values";

class LabHome extends React.Component {

    state = {
        user: {},
        isDataLoad: false,
    };

    loadUserData = (userData) => {
        if (!this.state.isDataLoad) {
            this.setState({user: userData, isDataLoad: true});
        }
    };

    renderMenu = () => {
        return (
            <StaticMenu to="/lab">
                <Link to="/lab/reports" className="item">Reports</Link>
                <Link to="#" className="item">Patients</Link>
                <div className="right menu">
                    <DropDownItem src={ImageURL + this.state.user.institution.logo}
                                  alt="user">
                        <div style={{color: "black", width: "250px", fontSize: "1.5em"}}>
                            <IDDImageItem to="/lab/settings"
                                          institution={this.state.user.institution}/>
                        </div>
                        <DDLinkItem to="/lab/settings" icon="user circle" text="Settings"/>
                        <DDLinkItem to="/" icon="retweet" text="Switch to User"/>
                        <DDLinkItem to="/logout" icon="sign-out" text="Logout"/>
                    </DropDownItem>
                </div>
            </StaticMenu>
        );
    };

    renderPageContent = () => {
        return (
            <Grid>
                <Row>
                    <Column size={16}>
                    </Column>
                </Row>
            </Grid>
        );
    };

    renderPage = () => {
        if (this.state.isDataLoad) {
            if (this.state.user.institution.type.type === undefined) {
                return <Redirect to="/"/>
            }
            if (this.state.user.institution.type.type !== PERMISSION_TYPE_LAB) {
                return <Redirect to="/"/>
            }
            return (
                <UserType
                    supervisor={
                        <div style={{backgroundColor: "#f1f2f5"}}>
                            {this.renderMenu()}
                            {this.renderPageContent()}
                        </div>
                    }
                    none={<Redirect to="/"/>}
                />
            );
        } else {
            return <div/>
        }
    };

    render() {
        return (
            <Authenticate
                loadData={this.loadUserData}
                AComponent={this.renderPage()}
                Dto="/"
            />
        );
    }
}

export default LabHome;