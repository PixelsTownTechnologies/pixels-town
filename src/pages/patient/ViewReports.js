import React from 'react';
import {Redirect} from "react-router-dom";
import Authenticate from "../../components/operation/Authenticate";
import Column from "../../components/layout/Column";
import Grid from "../../components/layout/Grid";
import Row from "../../components/layout/Row";
import UserType from "../../components/operation/UserType";
import Container from "../../components/layout/Container";
import Padding from "../../components/basics/Padding";
import backend from "../../apis/backend";
import HubReportCard from "../../components/card/HubReportCard";
import Dimmer from "../../components/basics/Dimmer";
import EmptyButton from "../../components/basics/EmptyButton";
import Field from "../../components/basics/Field";
import PatientSendToComponent from "./component/PatientSendToComponent";
import TextField from "../../components/basics/TextField";
import UserMenu from "../UserMenu";
import {connect} from "react-redux";
import {getUser} from "../../redux/actions/registration";
import {addReports, getReports} from "../../redux/actions/reports";
import ReportDimmer from "../../components/basics/ReportDimmer";
import {REPORTS_INITIAL_VALUE} from "../../redux/InitialValues";

class ViewReports extends React.Component {

    state = {
        reports: [],
        searchValue: "",
        isReportLoaded: false,
        reportSelected: undefined,
        isReportActive: false,
        isViewAction: false,
        selectedReceivers: [],
        messageValue: "",
        titleValue: "",
        reloadPage: false,
        reportImages: []
    };

    constructor(props) {
        super(props);
        this.props.getUser();
        this.props.getReports();
    }

    componentDidMount = async () => {
        if (this.props.user === undefined) {
            return undefined;
        }
        if (this.props.reports === REPORTS_INITIAL_VALUE) {
            const url = "/user/" + this.props.user.id + "/fetch_reports_hub_by_sender/";
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
        formData.append("sender", this.props.user.id);
        formData.append("msg", this.state.messageValue);
        formData.append("report", this.state.reportSelected.id);

        const url = "user/" + this.props.user.id + "/send_report/";
        const response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status_code === 200) {
            this.setState({reloadPage: true});
        }
    };

    searchAction = async () => {
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
                                placeholder="from ..."
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
                        <Column size={1}/>
                        <Column size={14}>
                            {this.renderSearchBar()}
                            <Padding repeat={1}/>
                            {this.renderReports()}
                        </Column>
                        <Column size={1}/>
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
                <HubReportCard
                    key={key}
                    report={report}
                    userId={this.props.user.id}
                    sendButton={
                        () => {
                            this.setState({reportSelected: report.report, isReportActive: true, isViewAction: false});
                        }}
                    viewButton={
                        (images) => {
                            const imagesSrc = images.map(item => {
                                return item.image;
                            });
                            this.setState({
                                reportSelected: report.report,
                                isReportActive: true,
                                isViewAction: true,
                                reportImages: imagesSrc
                            });
                        }}
                />
            );
        });
    };

    renderDimmer = () => {
        return (
            <Dimmer active={this.state.isReportActive && !this.state.isViewAction} reset={
                (value) => {
                    this.setState({isReportActive: value});
                }}
            >
                <div className="ui field" style={{textAlign: "left", fontSize: "1.4em"}}>
                    <label><i className="paper plane outline icon"/>Send Report</label>
                </div>
                <Field>
                    <label style={{textAlign: "left"}}>Send to:</label>
                    <PatientSendToComponent user={this.props.user} pushSelected={
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
        return (
            <UserType
                patient={
                    <div style={{backgroundColor: "#f1f2f5", height: "100%"}}>
                        <UserMenu/>
                        {this.renderPageContent()}
                        {this.renderDimmer()}
                        <ReportDimmer
                            active={this.state.isReportActive && this.state.isViewAction}
                            reset={
                                (value) => {
                                    this.setState({isReportActive: value});
                                }}
                            report={this.state.reportSelected}
                            images={this.state.reportImages}
                        />
                    </div>
                }
                supervisor={<Redirect to="/"/>}
                doctor={<Redirect to="/"/>}
                developer={<Redirect to="/"/>}
                none={<Redirect to="/"/>}
            />
        );
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
    return {user: state.user.user, reports: state.report.reports};
};

export default connect(mapStateToProps, {getUser, getReports, addReports})(ViewReports);