import React from 'react';
import {Redirect} from "react-router-dom";
import '../styles/Home.css'
import UserType from "../components/operation/UserType";
import Grid from "../components/layout/Grid";
import Column from "../components/layout/Column";
import Row from "../components/layout/Row";
import Form from "../components/basics/Form";
import LabelTeal from "../components/basics/LabelTeal";
import Field from "../components/basics/Field";
import TextField from "../components/basics/TextField";
import {Field as FormField, reduxForm} from "redux-form";
import CountryList from "../components/basics/CountryList";
import Padding from "../components/basics/Padding";
import Button from "../components/basics/Button";
import {FORM_BUTTON} from "./styles/StyleLogin";
import backend from "../apis/backend";
import {connect} from "react-redux";
import {addHospital, getUser} from "../redux/actions/registration";
import UserMenu from "./UserMenu";

class CreateSoftwareCompany extends React.Component {

    state = {
        hiddenMenu: false,
    };

    constructor(props) {
        super(props);
        this.props.getUser();
    }


    /*Fields Start*/

    FieldName = (formProps) => {
        return (
            <TextField
                required={true}
                autoComplete={true}
                placeholder="name"
                label="Name"
                {...formProps.input}
            />
        )
    };

    FieldPhoto = (formProps) => {
        return (
            <Field required={false}>
                <label htmlFor="fileupload">Photo</label>
                <div className="ui icon input">
                    <input
                        type="file"
                        autoComplete={false}
                        onChange={formProps.input.onChange}
                        src={formProps.input.value}
                    />
                </div>
            </Field>
        );
    };

    FieldLogo = (formProps) => {
        return (
            <Field required={true}>
                <label>Logo</label>
                <input
                    required={true}
                    type="file"
                    alt="logo"
                    autoComplete={false}
                    onChange={formProps.input.onChange}
                    src={formProps.input.value}
                />
            </Field>
        );
    };

    FieldEmail = (formProps) => {
        return (
            <Field>
                <label>Company email</label>
                <input {...formProps.input}
                       type="text"
                       name="email"
                       autoComplete={true}
                       placeholder="example@domain.com"

                />
            </Field>
        );
    };

    FieldDescription = (formProps) => {
        return (
            <Field
                required={true}
                label={<label>Description</label>}
                field={<textarea autoComplete={false} required={true} {...formProps.input}/>}
            />
        );
    };

    FieldCity = (formProps) => {
        return <TextField autoComplete={true} required={true} placeholder="city" label="City" {...formProps.input}/>;
    };

    FieldWebsite = (formProps) => {
        return <TextField autoComplete={true} required={false} placeholder="http://..."
                          label="Company website" {...formProps.input}/>;
    };

    FieldStreet = (formProps) => {
        return <TextField autoComplete={true} required={false} placeholder="street"
                          label="Street" {...formProps.input}/>;
    };

    FieldCountryList = (formProps) => {
        return <CountryList autoComplete={true} required={true} {...formProps.input}/>
    };

    FieldPhoneNumber = (formProps) => {
        return (
            <TextField
                required={true}
                autoComplete={true}
                label="Phone Number"
                placeholder="xxxx-xxxx-xxx"
                {...formProps.input}
            />
        );
    };

    /*Fields End*/

    renderFields = () => {
        return (
            <Grid>
                <Row>
                    <Column size={1}/>
                    <Column size={7}>
                        <FormField name="name" component={this.FieldName}/>
                    </Column>
                    <Column size={1}/>
                    <Column size={7}>
                        <FormField name="website" component={this.FieldWebsite}/>
                    </Column>
                </Row>
                <Row>
                    <Column size={1}/>
                    <Column size={7}>
                        <FormField name="description" component={this.FieldDescription}/>
                    </Column>
                    <Column size={1}/>
                    <Column size={7}>
                        <Grid>
                            <Row>
                                <Column size={16}>
                                    <FormField name="email" component={this.FieldEmail}/>
                                </Column>
                            </Row>
                            <Padding small={true}/>
                            <Row>
                                <Column size={16}>
                                    <FormField name="phone_number" component={this.FieldPhoneNumber}/>
                                </Column>
                            </Row>
                        </Grid>
                    </Column>
                </Row>
                <Row>
                    <Column size={1}/>
                    <Column size={7}>
                        <FormField name="country" component={this.FieldCountryList}/>
                    </Column>
                    <Column size={1}/>
                    <Column size={7}>
                        <FormField name="photo" component={this.FieldPhoto}/>
                    </Column>
                </Row>
                <Row>
                    <Column size={1}/>
                    <Column size={4}>
                        <FormField name="city" component={this.FieldCity}/>
                    </Column>
                    <Column size={3}>
                        <FormField name="street" component={this.FieldStreet}/>
                    </Column>
                    <Column size={1}/>
                    <Column size={7}>
                        <FormField name="logo" component={this.FieldLogo}/>
                    </Column>
                </Row>
                <Row/><Row/><Row/>

            </Grid>
        );
    };

    submitActionCore = async (formValues) => {
        var formData = new FormData();
        if (formValues.photo !== undefined) {
            formData.append("photo", formValues.photo[0]);
        }
        if (formValues.street !== undefined) {
            formData.append("street", formValues.street);
        }
        if (formValues.email !== undefined) {
            formData.append("email", formValues.email);
        }
        if (formValues.website !== undefined) {
            formData.append("website", formValues.website);
        }
        formData.append("logo", formValues.logo[0]);
        formData.append("name", formValues.name);
        formData.append("phone_number", formValues.phone_number);
        formData.append("country", formValues.country);
        formData.append("city", formValues.city);
        formData.append("country", formValues.country);
        formData.append("description", formValues.description);
        const url = "user/" + this.props.user.id + "/create_software_company/";
        const response = await backend.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data.status_code === 603) {
            this.setState({errorMsg: response.data.data.validation_errors[0].field_error})
        } else if (response.data.status_code === 605) {
            this.setState({errorMsg: response.data.data.message})
        } else {
            this.props.addHospital({institution: response.data.data.institution});
        }
    };

    renderForm = () => {
        return (
            <Form onSubmit={this.props.handleSubmit(this.submitActionCore)}>
                <Grid>
                    <Row/>
                    <Row>
                        <Column size={16}>
                            <LabelTeal style={{fontSize: "2.0em"}}
                                       text={<div><i className="building icon"/>Create Software Company</div>}/>
                        </Column>
                    </Row>
                    <Row/>
                    <Row/>
                    <Row>
                        <Column size={16}>
                            <h5 className="ui vertical divider header" style={{marginLeft: '20px', height: '45%'}}>
                                MORE
                            </h5>
                            {this.renderFields()}
                        </Column>
                    </Row>
                    <Row>
                        <Column size={1}/>
                        <Column size={7}>
                        </Column>
                        <Column size={1}/>
                        <Column size={7} style={{marginLeft: "-10px"}}>
                            <Button type="submit" text="Create"
                                    style={{...FORM_BUTTON, width: '100%', marginLeft: '0'}}
                            />
                        </Column>
                    </Row>
                    <Row/>
                </Grid>

            </Form>
        );
    };

    render() {
        if (this.props.user.institution !== undefined) {
            return <Redirect to="/"/>;
        }
        return (
            <UserType
                developer={
                    <div>
                        <UserMenu/>
                        <Grid style={{backgroundColor: "#f1f2f5"}}>
                            <Row style={{marginTop: "5%"}}>
                                <Column size={2}/>
                                <Column size={12}>
                                    {this.renderForm()}
                                </Column>
                                <Column size={2}/>
                            </Row>
                            <Row>
                                <Column size={16}>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={16}>
                                </Column>
                            </Row>
                            <Row>
                                <Column size={16}>
                                </Column>
                            </Row>
                        </Grid>
                    </div>
                }
                none={
                    <Redirect to="/"/>
                }
            />
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default reduxForm({
    form: 'createSoftwareCompany'
})(connect(mapStateToProps, {addHospital, getUser})(CreateSoftwareCompany));