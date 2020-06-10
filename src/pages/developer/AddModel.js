import React from "react";
import Authenticate from "../../components/operation/Authenticate";
import {connect} from "react-redux";
import {getUser} from "../../redux/actions/registration";
import UserType from "../../components/operation/UserType";
import {Redirect} from "react-router-dom";
import UserMenu from "../UserMenu";
import Container from "../../components/layout/Container";
import Grid from "../../components/layout/Grid";
import Row from "../../components/layout/Row";
import Column from "../../components/layout/Column";
import Field from "../../components/basics/Field";
import MultiImageField from "../../components/basics/MultiImageField";
import Padding from "../../components/basics/Padding";
import TextField from "../../components/basics/TextField";
import IOForm from "../../components/basics/IOForm";
import Button from "../../components/basics/Button";
import backend from "../../apis/backend";

class AddModel extends React.Component {

    state = {
        step: 1,
        //fields start
        name: "",
        description: "",
        version: "",
        logo: undefined,
        requestCost: 0.0,
        imagesModel: [],
        url: "",
        method: "",
        inputFields: [],
        outputFields: [],
        testSuccess: undefined,
        freeRequest: 0,
        doctorType: false,
        patientType: false,
        labType: false,
        discountRate: 0,
        discountPercentage: 0,
        //fields end
    };

    constructor(props) {
        super(props);
        this.props.getUser();
    }

    moveStep = () => {
        this.setState({step: this.state.step + 1});
    };

    backStep = () => {
        this.setState({step: this.state.step - 1});
    };

    renderStepClasses = (stepNumber) => {
        if (stepNumber === this.state.step) {
            return "active step";
        } else if (this.state.step > stepNumber) {
            return "step";
        } else {
            return "disabled step";
        }
    };

    staticCode = () => {
        return this.props.user.institution !== undefined;
    };

    createAction = async () => {
        var url = "/user/" + this.props.user.id + "/create_api/";
        var formData = new FormData();
        formData.append("url", this.state.url);
        formData.append("method", this.state.method);
        var response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status_code !== 200) {
            this.setState({testSuccess: false});
            return undefined;
        }
        const apiId = response.data.data.api.id;

        formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("description", this.state.description);
        formData.append("version", this.state.version);
        formData.append("logo", this.state.logo);
        formData.append("api", apiId);
        formData.append("request_cost", this.state.requestCost);
        formData.append("company", this.props.user.institution.id);
        formData.append("free_request", this.state.freeRequest);
        formData.append("lab_model", this.state.labType);
        formData.append("doctor_model", this.state.doctorType);
        formData.append("patient_model", this.state.patientType);
        formData.append("price_sell", this.state.discountPercentage);
        formData.append("sell_request_number", this.state.discountRate);
        url = "/user/" + this.props.user.id + "/create_model/";
        response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.data.status_code !== 200) {
            this.setState({testSuccess: false});
            return undefined;
        }
        const modelId = response.data.data.model.id;

        for (var i = 0; i < this.state.imagesModel.length; i++) {
            formData = new FormData();
            formData.append("image", this.state.imagesModel[i]);
            formData.append("model", modelId);
            url = "/user/" + this.props.user.id + "/create_image_model/";
            response = await backend.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        for (i = 0; i < this.state.inputFields.length; i++) {
            formData = new FormData();
            formData.append("api", apiId);
            formData.append("title", this.state.inputFields[i].title);
            formData.append("json_name", this.state.inputFields[i].json_name);
            formData.append("is_input", this.state.inputFields[i].is_input);
            formData.append("is_file", this.state.inputFields[i].is_file);
            url = "/user/" + this.props.user.id + "/create_io_api/";
            response = await backend.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status_code !== 200) {
                this.setState({testSuccess: false});
            }
        }

        for (i = 0; i < this.state.outputFields.length; i++) {
            formData = new FormData();
            formData.append("api", apiId);
            formData.append("title", this.state.outputFields[i].title);
            formData.append("json_name", this.state.outputFields[i].json_name);
            formData.append("is_input", this.state.outputFields[i].is_input);
            formData.append("is_file", this.state.outputFields[i].is_file);
            url = "/user/" + this.props.user.id + "/create_io_api/";
            response = await backend.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.status_code !== 200) {
                this.setState({testSuccess: false});
            }
        }

        this.setState({testSuccess: true});
    };

    componentStep = () => {
        return (
            <div className="ui three top attached steps">
                <div className={this.renderStepClasses(1)}>
                    <i className="cube icon"/>
                    <div className="content">
                        <div className="title">Model</div>
                        <div className="description">Setup your model and api</div>
                    </div>
                </div>
                <div className={this.renderStepClasses(2)}>
                    <i className="sign-in alternate icon"/>
                    <div className="content">
                        <div className="title">Input API</div>
                        <div className="description">Setup your inputs api</div>
                    </div>
                </div>
                <div className={this.renderStepClasses(3)}>
                    <i className="sign-out alternate icon"/>
                    <div className="content">
                        <div className="title">Output API</div>
                        <div className="description">Setup your outputs api</div>
                    </div>
                </div>
            </div>
        );
    };

    getDiscountPercentage = () => {
        if (this.state.discountRate <= 0) {
            return 0;
        }
        return ((this.state.discountPercentage * 50) / this.state.discountRate).toFixed(2);
    };

    getCostDiscountPercentage = () => {
        if (this.state.discountRate <= 0) {
            return (this.state.requestCost * 50);
        }
        const cost = (this.state.requestCost * 50) - (((this.state.discountPercentage * 50)
            / (this.state.discountRate * 100)) * this.state.requestCost * 50).toFixed(2);
        if(cost < 0){
            return 0;
        }else {
            return cost;
        }
    };

    componentModel = () => {
        return (
            <div>
                <form className="ui form" style={{marginTop: "7%"}}>
                    <Container>
                        <Grid>
                            <div className="ui vertical divider">
                                API
                            </div>
                            <Row>
                                <Column size={7}>
                                    <Field>
                                        <label>Model Name</label>
                                        <TextField value={this.state.name} onChange={(e) => {
                                            this.setState({name: e.target.value})
                                        }}/>
                                    </Field>
                                </Column>
                                <Column size={2}/>
                                <Column size={7}>
                                    <Field>
                                        <label>API Url</label>
                                        <div className="ui labeled input">
                                            <div className="ui teal label">
                                                http://
                                            </div>
                                            <input type="text" placeholder="api.domain" value={this.state.url}
                                                   onChange={(e) => {
                                                       this.setState({url: e.target.value})
                                                   }}
                                            />
                                        </div>
                                    </Field>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={7}>
                                    <Field>
                                        <label>Description</label>
                                        <textarea
                                            style={{resize: "none"}}
                                            value={this.state.description}
                                            onChange={(e) => {
                                                this.setState({description: e.target.value})
                                            }}
                                        />
                                    </Field>
                                </Column>
                                <Column size={2}/>
                                <Column size={7}>
                                    <Field>
                                        <label>Version</label>
                                        <div className="ui labeled input">
                                            <div className="ui teal label">
                                                <i className="cogs icon"/>
                                            </div>
                                            <input type="text" placeholder="V1.0.2.51" value={this.state.version}
                                                   onChange={(e) => {
                                                       this.setState({version: e.target.value})
                                                   }}
                                            />
                                        </div>
                                    </Field>
                                    <Padding repeat={1}/>
                                    <Field>
                                        <label>Method</label>
                                        <select className="ui dropdown" value={this.state.method} onChange={(e) => {
                                            this.setState({method: e.target.value})
                                        }}>
                                            <option value="">Method</option>
                                            <option value="GET">GET</option>
                                            <option value="POST">POST</option>
                                            <option value="UPDATE">UPDATE</option>
                                        </select>
                                    </Field>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={7}>
                                    <Field>
                                        <label>Logo</label>
                                        <input
                                            required={true}
                                            type="file"
                                            alt="logo"
                                            autoComplete={false}
                                            onChange={(e) => {
                                                this.setState({logo: e.target.files[0]})
                                            }}
                                            src={this.state.logo}
                                        />
                                    </Field>
                                </Column>
                                <Column size={2}/>
                                <Column size={3}>
                                    <Field>
                                        <label>Model allowed to</label>
                                        <Field>
                                            <div className="ui checked checkbox" style={{marginTop: "25px"}}>
                                                <input type="checkbox" value={this.state.doctorType} onChange={() => {
                                                    this.setState({doctorType: !this.state.doctorType})
                                                }}/>
                                                <label>Doctor</label>
                                            </div>
                                        </Field>
                                    </Field>
                                </Column>
                                <Column size={2}>
                                    <Field>
                                        <label style={{color: "white", marginTop: "25px"}}>....</label>
                                        <Field>
                                            <div className="ui checked checkbox">
                                                <input type="checkbox" value={this.state.patientType} onChange={() => {
                                                    this.setState({patientType: !this.state.patientType})
                                                }}/>
                                                <label>Patient</label>
                                            </div>
                                        </Field>
                                    </Field>
                                </Column>
                                <Column size={2}>
                                    <Field>
                                        <label style={{color: "white", marginTop: "25px"}}>....</label>
                                        <Field>
                                            <div className="ui checked checkbox">
                                                <input type="checkbox" value={this.state.labType} onChange={() => {
                                                    this.setState({labType: !this.state.labType})
                                                }}/>
                                                <label>Lab</label>
                                            </div>
                                        </Field>
                                    </Field>
                                </Column>
                            </Row>
                        </Grid>
                    </Container>
                </form>
                <Padding repeat={3}/>
                <form className="ui form">
                    <Container>
                        <Grid>
                            <Row>
                                <Column size={16}>
                                    <Field>
                                        <label>Add Photos to your models:</label>
                                        <MultiImageField pushImages={(images) => {
                                            this.setState({imagesModel: images})
                                        }}/>
                                    </Field>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={4}>
                                    <Field className="ui right labeled input">
                                        <label>Request Cost <div>Cost of 50
                                            Request {(this.state.requestCost * 50).toFixed(3)}$</div></label>
                                        <input type="number" step="0.01" min="0" value={this.state.requestCost}
                                               onChange={(e) => {
                                                   this.setState({requestCost: e.target.value})
                                               }}
                                        />
                                    </Field>
                                </Column>
                                <Column size={4}>
                                    <Field className="ui right labeled input">
                                        <label>Free Requests
                                            <div>Cost of free
                                                Requests {(this.state.requestCost * this.state.freeRequest).toFixed(2)}$
                                            </div>
                                        </label>
                                        <input type="number" step="1" min="0" value={this.state.freeRequest}
                                               onChange={(e) => {
                                                   this.setState({freeRequest: e.target.value})
                                               }}
                                        />
                                    </Field>
                                </Column>
                                <Column size={4}>
                                    <Field className="ui right labeled input">
                                        <label>Discount percentage
                                            <div>Discount on 50
                                                Requests {this.getDiscountPercentage()}%
                                            </div>
                                        </label>
                                        <div className="ui right labeled input">

                                            <input type="number" step="0.1" min="0"
                                                   value={this.state.discountPercentage}
                                                   onChange={(e) => {
                                                       this.setState({discountPercentage: e.target.value})
                                                   }}
                                            />
                                        </div>
                                    </Field>
                                </Column>
                                <Column size={4}>
                                    <Field className="ui right labeled input">
                                        <label>Discount request rate
                                            <div>Cost of 50
                                                Requests {this.getCostDiscountPercentage()}$
                                            </div>
                                        </label>
                                        <input type="number" step="1" value={this.state.discountRate}
                                               onChange={(e) => {
                                                   this.setState({discountRate: e.target.value})
                                               }}
                                        />
                                    </Field>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={13}/>
                                <Column size={3} style={{width: "100%"}}>
                                    <div
                                        className="ui animated teal button"
                                        style={{width: "100%"}}
                                        tabIndex="0"
                                        onClick={this.moveStep}
                                    >
                                        <div className="visible content"> Next</div>
                                        <div className="hidden content">
                                            <i className="angle double right icon"/>
                                        </div>
                                    </div>
                                </Column>
                            </Row>
                        </Grid>
                    </Container>
                </form>
            </div>
        );
    };

    nextButtonDisabled = (input) => {
        if (input) {
            if (this.state.inputFields.length === 0) {
                return "ui animated disabled teal button";
            } else {
                return "ui animated teal button";
            }
        } else {
            if (this.state.outputFields.length === 0) {
                return "ui animated disabled teal button";
            } else {
                return "ui animated teal button";
            }
        }
    };

    componentInput = () => {
        return (
            <IOForm
                key={0}
                input={true}
                pushFields={(list) => (this.setState({inputFields: list}))}
                fields={this.state.inputFields}
                buttons={
                    <Row>
                        <Column size={11}/>
                        <Column size={3} style={{width: "100%"}}>
                            <button
                                className="ui inverted secondary  button"
                                style={{width: "100%"}}
                                onClick={this.backStep}
                            >Previous
                            </button>
                        </Column>
                        <Column size={2} style={{width: "100%"}}>
                            <div
                                className={this.nextButtonDisabled(true)}
                                style={{width: "100%"}}
                                tabIndex="0"
                                onClick={this.moveStep}
                            >
                                <div className="visible content"> Next</div>
                                <div className="hidden content">
                                    <i className="angle double right icon"/>
                                </div>
                            </div>
                        </Column>
                    </Row>
                }
            />
        );
    };

    componentOutput = () => {
        return (
            <IOForm
                key={1}
                input={false}
                pushFields={(list) => (this.setState({outputFields: list}))}
                fields={this.state.outputFields}
                buttons={
                    <Row>
                        <Column size={11}/>
                        <Column size={3} style={{width: "100%"}}>
                            <button
                                className="ui inverted secondary  button"
                                style={{width: "100%"}}
                                onClick={this.backStep}>Previous
                            </button>
                        </Column>
                        <Column size={2} style={{width: "100%"}}>
                            <div
                                className={this.nextButtonDisabled(false)}
                                style={{width: "100%"}}
                                tabIndex="0"
                                onClick={() => {
                                    this.moveStep();
                                    this.createAction()
                                }}
                            >
                                <div className="visible content"> Create</div>
                                <div className="hidden content">
                                    <i className="angle double right icon"/>
                                </div>
                            </div>
                        </Column>
                    </Row>
                }
            />
        );
    };

    componentCreationClassesMsg = () => {
        if (this.state.testSuccess === undefined) {
            return "notched circle loading icon";
        } else if (this.state.testSuccess) {
            return "check green icon";
        } else {
            return "x icon red icon";
        }
    };

    componentCreation = () => {
        return (
            <div className="ui form">
                <Padding repeat={2}/>
                <Container>
                    <Grid>
                        <Row/><Row/>
                        <Row>
                            <Column size={4}/>
                            <Column size={8}>
                                <div className="ui icon message">
                                    <i className={this.componentCreationClassesMsg()}/>
                                    <div className="content">
                                        <div className="header">
                                            Waiting to Test Api
                                        </div>
                                        <p>TackleLabs will test model by sending test request to test if response map to
                                            output and if input map to request.</p>
                                    </div>
                                </div>
                            </Column>
                            <Column size={4}/>
                        </Row>
                        <Row/><Row/>
                        <Row>
                            <Column size={6}/>
                            <Column size={4}>
                                <Button text="Done !" style={{width: "100%"}}/>
                            </Column>
                            <Column size={6}/>
                        </Row>
                        <Row/><Row/>
                    </Grid>
                </Container>
            </div>
        );
    };

    componentStepForms = () => {
        if (this.state.step === 1) {
            return this.componentModel();
        } else if (this.state.step === 2) {
            return this.componentInput();
        } else if (this.state.step === 3) {
            return this.componentOutput();
        } else if (this.state.step === 4) {
            return this.componentCreation();
        }
    };

    renderPage = () => {
        return (
            <Container>
                <Grid>
                    <Row/><Row/><Row/>
                    <Row style={{marginTop: "2.5%"}}>
                        <Column size={1}/>
                        <Column size={14}>
                            <div className="ui padded segment">
                                <Padding repeat={1}/>
                                {this.componentStep()}
                                {this.componentStepForms()}
                            </div>
                            <Padding repeat={4}/>
                        </Column>
                        <Column size={1}/>
                    </Row>
                </Grid>
            </Container>
        );
    };

    render() {
        if (!this.staticCode()) {
            return <div/>;
        }
        return (
            <Authenticate
                AComponent={
                    <UserType
                        doctor={
                            <Redirect to="/"/>
                        }
                        patient={
                            <Redirect to="/"/>
                        }
                        supervisor={
                            <Redirect to="/"/>
                        }
                        developer={
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
                                <Padding repeat={2}/>
                            </div>
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

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser})(AddModel);