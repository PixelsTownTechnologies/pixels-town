import React from 'react';
import {Redirect} from "react-router-dom";
import Authenticate from "../../components/operation/Authenticate";
import Column from "../../components/layout/Column";
import Grid from "../../components/layout/Grid";
import Row from "../../components/layout/Row";
import UserType from "../../components/operation/UserType";
import Container from "../../components/layout/Container";
import Padding from "../../components/basics/Padding";
import LabelTeal from "../../components/basics/LabelTeal";
import Field from "../../components/basics/Field";
import TextField from "../../components/basics/TextField";
import MultiImageField from "../../components/basics/MultiImageField";
import PatientSelector from "../../pages/lab/components/PatientSelector";
import Dimmer from "../../components/basics/Dimmer";
import SendToComponent from "../../pages/lab/components/SendToComponent";
import EmptyButton from "../../components/basics/EmptyButton";
import backend from "../../apis/backend";
import UserMenu from "../UserMenu";

class DoctorCreateReport extends React.Component {

    state = {
        user: {},
        isDataLoad: false,
        patientSelected: [],
        files: [],
        title: "",
        description: "",
        isReportActive: false,
        activeReport: undefined,
        sendSelectedReceivers: [],
        sendMessage: "",
        sendTitle: "",
        reloadPage: false,
    };

    saveAction = async (isReloadAction = true) => {
        const formData = new FormData();
        formData.append("photo_size", this.state.files.length);
        for (var i = 1; i < this.state.files.length + 1; i++) {
            formData.append("photo" + i, this.state.files[i - 1]);
        }
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("patient", this.state.patientSelected.id);
        formData.append("doctor", this.state.user.id);

        const url = "user/" + this.state.user.id + "/create_report/";
        const response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status_code === 200 && isReloadAction) {
            this.setState({reloadPage: true});
        }
        return response.data.data.report;
    };

    sendAction = async () => {
        const report = await this.saveAction(false);
        const formData = new FormData();
        const receiver_list = [];
        for (let i = 0; i < this.state.sendSelectedReceivers.length; i++) {
            receiver_list.push(this.state.sendSelectedReceivers[i].id);
        }
        formData.append("receiver_list", receiver_list);
        formData.append("title", this.state.sendTitle);
        formData.append("sender", this.state.user.id);
        formData.append("msg", this.state.sendMessage);
        formData.append("report", report.id);

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

    loadUserData = (userData) => {
        if (!this.state.isDataLoad) {
            this.setState({user: userData, isDataLoad: true});
        }
    };

    pushPatientSelected = (patients) => {
        this.setState({patientSelected: patients})
    };

    pushFilesSelected = (files) => {
        this.setState({files: files})
    };

    reportForm = () => {
        return (
            <div className="ui segment">
                <LabelTeal text={<div><i className="file alternate icon"/>Create Report</div>}
                           style={{fontSize: "1.5em"}}/>
                <Padding repeat={2}/>
                <Field label={<label>Patients</label>}
                       field={
                           <PatientSelector user={this.state.user} pushSelected={this.pushPatientSelected}/>
                       }
                />
                <Padding repeat={2}/>
                <div className="ui form">
                    <Field label={<label>Images</label>}
                           field={
                               <MultiImageField pushImages={this.pushFilesSelected}/>
                           }
                    />
                    <Field
                        label={<label>Info</label>}
                        field={
                            <TextField
                                value={this.state.title}
                                onChange={
                                    (e) => {
                                        this.setState({title: e.target.value});
                                    }
                                }
                            />}
                    />
                    <Field
                        label={<label>Decision</label>}
                        field={
                            <textarea
                                value={this.state.description}
                                onChange={
                                    (e) => {
                                        this.setState({description: e.target.value});
                                    }
                                }
                            />}
                    />
                    <div
                        className="ui animated teal button"
                        tabIndex="0"
                        onClick={
                            () => {
                                this.saveAction();
                            }
                        }
                    >
                        <div className="visible content"> Save</div>
                        <div className="hidden content">
                            <i className="save icon"/>
                        </div>
                    </div>
                    <div
                        className="ui animated grey button"
                        tabIndex="0"
                        onClick={
                            () => {
                                this.setState({isReportActive: true});
                            }
                        }
                    >
                        <div className="visible content"> Send</div>
                        <div className="hidden content">
                            <i className="paper plane icon"/>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                            this.setState({sendSelectedReceivers: selected});
                        }
                    }/>
                </Field>
                <Field>
                    <label style={{textAlign: "left"}}>Title</label>
                    <TextField
                        placeholder="title..."
                        value={this.state.sendTitle}
                        autoComplete={false}
                        style={{fontSize: "1.1em"}}
                        onChange={
                            (e) => {
                                this.setState({sendTitle: e.target.value})
                            }
                        }
                    />
                </Field>
                <Field>
                    <label style={{textAlign: "left"}}>Message</label>
                    <textarea
                        placeholder="message..."
                        value={this.state.sendMessage}
                        autoComplete={false}
                        style={{fontSize: "1.1em"}}
                        onChange={
                            (e) => {
                                this.setState({sendMessage: e.target.value})
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

    renderPageContent = () => {
        return (
            <Container style={{width: "96%", marginLeft: "2%"}}>
                <Grid>
                    <Row/><Row/><Row/><Row/>
                    <Row>
                        <Column size={2}/>
                        <Column size={12}>
                            {this.reportForm()}
                        </Column>
                        <Column size={2}/>
                    </Row>
                    <Padding repeat={3}/>
                    {this.renderDimmer()}
                </Grid>
            </Container>
        );
    };

    renderPage = () => {
        if (this.state.isDataLoad) {
            return (
                <UserType
                    doctor={
                        <div style={{backgroundColor: "#f1f2f5"}}>
                            <UserMenu/>
                            {this.renderPageContent()}
                        </div>
                    }
                    supervisor={<Redirect to="/"/>}
                    patient={<Redirect to="/"/>}
                    developer={<Redirect to="/"/>}
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
                title: "",
                description: "",
                isReportActive: false,
                sendMessage: "",
                sendTitle: "",
            });
            return <Redirect to="/doctor/create-report/"/>;
        }
        if (this.state.isDataLoad && !this.state.isReportLoaded) {
            this.setState({isReportLoaded: true});
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

export default DoctorCreateReport;