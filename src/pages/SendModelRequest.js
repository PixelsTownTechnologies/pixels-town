import React from "react";
import Authenticate from "../components/operation/Authenticate";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/registration";
import UserType from "../components/operation/UserType";
import {Redirect} from "react-router-dom";
import UserMenu from "./UserMenu";
import Container from "../components/layout/Container";
import Grid from "../components/layout/Grid";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import backend from "../apis/backend";
import Field from "../components/basics/Field";
import Padding from "../components/basics/Padding";
import RequestImageSelector from "../components/basics/RequestImageSelector";
import UpDownSegment from "../components/basics/UpDownSegment";
import Button from "../components/basics/Button";


class SendModelRequest extends React.Component {

    state = {
        reports: [],
        ios: [],
        pageLoading: true,
        reportAttached: [],
        imageList: [],
        newChange: false,
        selectImage: undefined,
        isUrlImageSelected: false,
        inputValues: {},
        requestSend: false,
        waitingResponse: false,
        loadingReport: true,
    };

    constructor(props) {
        super(props);
        this.props.getUser();
    }

    componentDidMount = async () => {
        var url = "/user/" + this.props.user.id + "/fetch_user_reports/";
        backend.get(url).then(
            (response) => {
                if (response.data.status_code === 200) {
                    this.setState({reports: response.data.data.reports, loadingReport: false});
                }
            });

        //fetch IOApi
        url = "/user/" + this.props.user.id + "/fetch_io_api/" + this.props.model.model.api;
        var response = await backend.get(url);
        if (response.data.status_code === 200) {
            this.setState({ios: response.data.data.ios});
        }
        this.setState({pageLoading: false});
    };

    componentWillReceiveProps(nextProps, nextContext) {
    }

    componentDidUpdate = async (nextProps, nextState, nextContext) => {
        if (this.state.newChange) {
            var imageList = [];
            for (var i = 0; i < this.state.reportAttached.length; i++) {
                var url = "/user/" + this.props.user.id + "/fetch_report_images/" + this.state.reportAttached[i].id;
                var response = await backend.get(url);
                if (response.data.status_code === 200) {
                    imageList = [...imageList, ...response.data.data.images];
                }
            }
            this.setState({imageList: imageList, newChange: false});
        }
    };

    staticCode = () => {
        return this.props.user.institution !== undefined;
    };

    renderAttachedAndUnattached = (item) => {
        if (this.state.reportAttached.includes(item)) {
            return (
                <div className="extra" style={{cursor: "pointer"}} onClick={() => {
                    const newArray = this.state.reportAttached.filter(function (value, index, arr) {
                        return value !== item;
                    });
                    this.setState({reportAttached: newArray, newChange: true});
                }}>
                    <i className="red minus icon"/>
                    Un Attach
                </div>
            );
        } else {
            return (
                <div className="extra" style={{cursor: "pointer"}} onClick={() => {
                    this.setState({reportAttached: [...this.state.reportAttached, item], newChange: true});
                }}>
                    <i className="green plus icon"/>
                    Attach
                </div>
            );
        }
    };

    componentReportsRender = () => {
        if (this.state.loadingReport) {
            return (
                <h3 className="ui center aligned icon header">
                    <div className="ui bug active centered inline loader" style={{marginTop: "50%"}}/>
                    Loading Reports
                </h3>
            );
        }
        console.log(this.state.reports);
        return this.state.reports.map((item, key) => {
            if (item.doctor !== null) {
                return (
                    <div className="item" key={key}>
                        <div className="content">
                            <div className="header" style={{fontSize: "1.0em"}}><i
                                className="user md icon"/>Creator: {item.doctor.first_name} {item.doctor.last_name}</div>
                            <br/>
                            <div className="header" style={{fontSize: "1.0em"}}><i
                                className="id badge icon"/>Patient: {item.patient.first_name} {item.patient.last_name}</div>
                            <br/>
                            <div className="header" style={{fontSize: "1.0em"}}><i
                                className="paperclip icon"/>ID: {item.serial_numbers}</div>
                            {this.renderAttachedAndUnattached(item)}
                        </div>
                    </div>
                );
            }else {
                return (
                    <div className="item" key={key}>
                        <div className="content">
                            <div className="header" style={{fontSize: "1.0em"}}><i
                                className="user md icon"/>Creator: {item.lab.name}</div>
                            <br/>
                            <div className="header" style={{fontSize: "1.0em"}}><i
                                className="id badge icon"/>Patient: {item.patient.first_name} {item.patient.last_name}</div>
                            <br/>
                            <div className="header" style={{fontSize: "1.0em"}}><i
                                className="paperclip icon"/>ID: {item.serial_numbers}</div>
                            {this.renderAttachedAndUnattached(item)}
                        </div>
                    </div>
                );
            }
        });
    };

    /*
     "id": 19,
    "title": "ttt",
    "is_input": false,
    "json_name": "ttt",
    "is_file": true,
    "api": 11
    */

    sendRequest = async () => {
        this.setState({waitingResponse: true});
        const formData = new FormData();
        for (let i = 0; i < this.state.ios.length; i++) {
            if (this.state.ios[i].is_input) {
                formData.append(this.state.ios[i].json_name, this.state.ios[i].value);
            }
        }
        //user/<int:user_id>/send_request/<int:api>/<int:subscription_id>/
        const url = "user/" + this.props.user.id + "/send_request/" + this.props.model.model.api + "/" + this.props.model.id + "/";
        backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            (response) => {
                if (response.data.status_code === 200) {
                    for (let i = 0; i < this.state.ios.length; i++) {
                        if (!this.state.ios[i].is_input) {
                            this.state.ios[i].value = response.data.data.response_back[this.state.ios[i].json_name]
                        }
                    }
                    this.setState({requestSend: true, waitingResponse: false});
                }
            });
    };

    renderInputFields = () => {
        return this.state.ios.map((item, key) => {
            if (item.is_input) {
                if (!item.is_file) {
                    return (<Field>
                        <label>{item.title}</label>
                        <input
                            type="text"
                            value={item.value}
                            onChange={
                                (e) => {
                                    item.value = e.target.value
                                }}
                        />
                    </Field>);
                } else {
                    return (
                        <Field>
                            <label>{item.title}</label>
                            <RequestImageSelector
                                images={this.state.imageList}
                                pushImages={(image, isUrl) => {
                                    if (isUrl) {
                                        item.value = image.id;
                                    } else {
                                        item.value = image;
                                    }
                                }}
                            />
                        </Field>
                    );
                }
            }
        });
    };

    renderOutputFields = () => {
        if (this.state.waitingResponse) {
            return (
                <h2 className="ui center aligned icon header">
                    <div className="ui bug active centered inline loader"/>
                    Waiting to get result
                </h2>
            );
        }
        if (!this.state.requestSend) {
            return (
                <h2 className="ui center aligned icon header">
                    <i className="circular cloud upload icon"/>
                    Send request to fetch result !
                </h2>
            );
        }
        return this.state.ios.map((item, key) => {
            if (!item.is_input) {
                if (!item.is_file) {
                    return (<Field>
                        <label>{item.title}</label>
                        <textarea readOnly value={item.value} rows={6} style={{resize: "none",maxHeight:"120px"}}/>
                    </Field>);
                } else {
                    return (
                        <Field>
                            <label>{item.title}</label>
                            <img className="ui fluid image" src={item.value} alt={item.title}/>
                        </Field>
                    );
                }
            }
        });
    };

    renderPage = () => {
        if (this.state.pageLoading) {
            return (
                <div className="ui active dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
            );
        }
        return (
            <Container>
                <Grid>
                    <Row/><Row/><Row/>
                    <Row>
                        <Column size={12}>
                            <div className="ui segment">
                                <div className="item">
                                    <div className="content">
                                        <div className="ui large header">Setup Request
                                        </div>
                                    </div>
                                </div>
                                <Padding small={true}/>
                                <div className="ui fitted divider"/>
                                <Padding repeat={1}/>
                                <UpDownSegment title="Model Inputs">
                                    {this.renderInputFields()}
                                </UpDownSegment>
                                <UpDownSegment title="Model Outputs">
                                    {this.renderOutputFields()}
                                </UpDownSegment>
                                <Button text="Send request" onClick={this.sendRequest}
                                        disabled={this.state.waitingResponse}/>
                                <Button text="Create Report" disabled={!this.state.requestSend}/>
                            </div>
                        </Column>
                        <Column size={4}>
                            <div className="ui segment">
                                <div className="item">
                                    <div className="content">
                                        <div className="ui large header">Reports</div>
                                    </div>
                                </div>
                                <div className="ui divided items"
                                     style={{
                                         overscrollBehaviorY: "auto",
                                         overflow: "auto",
                                         maxHeight: "450px",
                                         minHeight: "450px"
                                     }}>
                                    {this.componentReportsRender()}
                                </div>
                            </div>
                        </Column>
                    </Row>
                    <Row>

                        <Column size={12}>
                            <div className="ui segment">
                                <Grid>
                                    <Row>
                                        <Column>
                                            <h2 className="ui header">
                                                <i className="paper plane icon"/>
                                                <div className="content">
                                                    Feedback
                                                </div>
                                            </h2>
                                        </Column>
                                    </Row>
                                    <Row>
                                        <div className="ui form" style={{width: "100%"}}>
                                            <Container>
                                                <Grid>
                                                    <Row>
                                                        <div className="field" style={{marginLeft: "5%", width: "90%"}}>
                                                            <label>Description</label>
                                                            <textarea rows="5"/>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="field" style={{marginLeft: "5%", width: "90%"}}>
                                                            <Button text="Send"/>
                                                        </div>
                                                    </Row>
                                                </Grid>
                                            </Container>
                                        </div>
                                    </Row>
                                </Grid>
                            </div>
                        </Column>
                    </Row>
                    <Row/><Row/>
                </Grid>
            </Container>
        );
    };

    render() {
        return (
            <Authenticate
                AComponent={
                    <UserType
                        doctor={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                            </div>
                        }
                        patient={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                            </div>
                        }
                        supervisor={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                            </div>
                        }
                        developer={
                            <Redirect to="/"/>
                        }
                        none={
                            <Redirect to="/"/>
                        }
                    />
                }
                Dto="/"
            />
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const model = {
        "id": 1,
        "model": {
            "id": 6,
            "company": {
                "name": "DNA Lab Adham",
                "logo": "/media/company_logo/attachment_92102020-e1518608585683_eno9V4f.jpg",
                "id": 10,
                "manager": 6
            },
            "name": "sdfsf",
            "description": "dsdsdds",
            "version": "ddddd",
            "logo": "/media/F114225/723249_3aHqFN5.png",
            "request_cost": 1.5,
            "free_request": 0,
            "discount_percentage": 0.0,
            "discount_rate": 0,
            "patient_model": true,
            "doctor_model": true,
            "lab_model": true,
            "api": 11
        },
        "user": {
            "id": 1,
            "first_name": "zaid",
            "last_name": "habiba",
            "code": "y9ydxk",
            "type": {
                "id": 2,
                "type": "Patient"
            },
            "phone_number": "",
            "gender": "m",
            "email": "zaid-habiba@hotmail.com",
            "photo": "/media/user_photos/homeBackground.jpg"
        },
        "number_of_request": 47,
        "request_used": 0,
        "is_free": false
    };
    //ownProps.location.model
    console.log(ownProps);
    return {user: state.user.user, model: ownProps.location.model};
};

export default connect(mapStateToProps, {getUser})(SendModelRequest);