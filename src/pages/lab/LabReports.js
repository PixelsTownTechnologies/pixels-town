import React from 'react';
import {Redirect} from "react-router-dom";
import Authenticate from "../../components/operation/Authenticate";
import Column from "../../components/layout/Column";
import Grid from "../../components/layout/Grid";
import Row from "../../components/layout/Row";
import UserType from "../../components/operation/UserType";
import {PERMISSION_TYPE_LAB} from "../../components/operation/values";
import Container from "../../components/layout/Container";
import Padding from "../../components/basics/Padding";
import backend from "../../apis/backend";
import ReportCard from "../../components/card/ReportCard";
import Dimmer from "../../components/basics/Dimmer";
import EmptyButton from "../../components/basics/EmptyButton";
import Field from "../../components/basics/Field";
import SendToComponent from "./components/SendToComponent";
import TextField from "../../components/basics/TextField";
import UserMenu from "../UserMenu";
import {connect} from "react-redux";
import {addReports, getReports} from "../../redux/actions/reports";
import {REPORTS_INITIAL_VALUE} from "../../redux/InitialValues";

class LabReports extends React.Component {

    state = {
        user: {},
        isDataLoad: false,
        reports: [],
        searchValue: "",
        isReportLoaded: false,
        reportSelected: undefined,
        isReportActive: false,
        selectedReceivers: [],
        messageValue: "",
        titleValue: "",
        reloadPage: false,
    };

    constructor(props) {
        super(props);
        this.props.getReports();
    }


    loadUserData = (userData) => {
        if (!this.state.isDataLoad) {
            this.setState({user: userData, isDataLoad: true});
        }
    };

    loadReports = async () => {
        if (this.props.reports === REPORTS_INITIAL_VALUE) {
            const url = "/user/" + this.state.user.id + "/fetch_reports/" + this.state.user.institution.id;
            const response = await backend.get(url);
            if (response.data.status_code === 200) {
                this.props.addReports(response.data.data.reports);
            }
        }
    };

    sendAction = async () => {
        const formData = new FormData();
        const receiver_list = [];
        for (let i = 0; i < this.state.selectedReceivers.length; i++) {
            receiver_list.push(this.state.selectedReceivers[i].id);
        }
        formData.append("receiver_list", receiver_list);
        formData.append("title", this.state.titleValue);
        formData.append("sender", this.state.user.id);
        formData.append("msg", this.state.messageValue);
        formData.append("report", this.state.reportSelected.id);

        const url = "user/" + this.state.user.id + "/send_report/";
        const response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status_code === 200) {
            this.setState({reloadPage: true});
        }
    };

    /*Items page*/
    searchAction = async () => {
        if (this.state.user.join_institution !== undefined) {
            this.setState({error: true});
            return undefined;
        }
        const url = "user/" + this.state.user.id + "/fetch_lab_saved_reports_search/"
            + this.state.user.institution.id + "/?search=" + this.state.searchValue;
        const response = await backend.get(url);
        this.setState({reports: response.data.data.reports});
    };

    renderSearchBar = () => {
        return (
            <div>
                <Row>
                    <Column size={3}/>
                    <Column size={10}>
                        <h2 className="ui header">
                            <i className="search icon"/>
                            <div className="content">
                                Find Report
                            </div>
                        </h2>
                    </Column>
                    <Column size={3}/>
                </Row>
                <Padding repeat={1}/>
                <Row>
                    <Column size={3}/>
                    <Column size={10}>
                        <div className="ui action input" style={{width: "100%", height: "40px"}}>
                            <input
                                type="text"
                                placeholder="Patient name..."
                                onChange={(e) => {
                                    this.setState({searchValue: e.target.value})
                                }}
                                value={this.state.searchValue}
                                onKeyDown={e => {
                                    if (e.keyCode === 13)
                                        this.searchAction()
                                }}
                            />
                            <button className="ui button" onClick={this.searchAction}>Search</button>
                        </div>
                    </Column>
                    <Column size={3}/>
                </Row>
            </div>
        );
    };

    renderPageContent = () => {
        return (
            <Container style={{width: "96%", marginLeft: "2%"}}>
                <Grid>
                    <Padding repeat={7}/>
                    <Row>
                        <Column size={2}/>
                        <Column size={12}>
                            {this.renderSearchBar()}
                            <Padding repeat={1}/>
                            {this.renderReports()}
                        </Column>
                        <Column size={2}/>
                    </Row>
                    <Padding repeat={3}/>
                </Grid>
            </Container>
        );
    };

    renderReports = () => {
        if (this.props.reports.length === 0) {
            return (
                <div style={{marginTop: "400px"}}>
                    <div className="ui large active text loader">Loading</div>
                </div>
            );
        }
        return this.props.reports.map((report, key) => {
            return (
                <ReportCard key={key} report={report} userId={this.state.user.id} onClickButton={
                    () => {
                        this.setState({reportSelected: report, isReportActive: true});
                    }}/>
            );
        });
    };


    renderDimmer = () => {
        return (
            <Dimmer active={this.state.isReportActive} reset={
                (value) => {
                    this.setState({isReportActive: value});
                }}
            >
                <div className="ui field" style={{textAlign: "left", fontSize: "1.4em"}}>
                    <label><i className="paper plane outline icon"/>Send Report</label>
                </div>
                <Field>
                    <label style={{textAlign: "left"}}>Send to:</label>
                    <SendToComponent user={this.state.user} pushSelected={
                        (selected) => {
                            this.setState({selectedReceivers: selected});
                        }
                    }/>

                </Field>
                <Field>
                    <label style={{textAlign: "left"}}>Title</label>
                    <TextField
                        placeholder="title..."
                        value={this.state.titleValue}
                        autoComplete={false}
                        style={{fontSize: "1.1em"}}
                        onChange={
                            (e) => {
                                this.setState({titleValue: e.target.value})
                            }
                        }
                    />
                </Field>
                <Field>
                    <label style={{textAlign: "left"}}>Message</label>
                    <textarea
                        placeholder="message..."
                        value={this.state.messageValue}
                        autoComplete={false}
                        style={{fontSize: "1.1em"}}
                        onChange={
                            (e) => {
                                this.setState({messageValue: e.target.value})
                            }
                        }
                    />
                </Field>
                <div className="ui field">
                    <EmptyButton text="Send" style={{width: "200px"}}
                                 onClick={this.sendAction}/>
                </div>
            </Dimmer>
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
                        <div style={{backgroundColor: "#f1f2f5", height: "100%"}}>
                            <UserMenu/>
                            {this.renderPageContent()}
                            {this.renderDimmer()}
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
        if (this.state.reloadPage) {
            this.setState({
                reloadPage: false,
                isReportActive: false,
                titleValue: "",
                messageValue: "",
            });
        }
        if (this.state.isDataLoad && !this.state.isReportLoaded) {
            this.setState({isReportLoaded: true});
            this.loadReports();
        }
        return (
            <Authenticate
                loadData={this.loadUserData}
                AComponent={this.renderPage()}
                Dto="/"
            />
        );
    }
}

const mapStateToProps = state => {
    return {reports: state.report.reports};
};

export default connect(mapStateToProps, {getReports, addReports})(LabReports);