import React from 'react';
import Row from "../components/layout/Row";
import Container from "../components/layout/Container";
import Column from "../components/layout/Column";
import Grid from "../components/layout/Grid";
import background from '../images/loginbg.jpeg';
import Padding from "../components/basics/Padding";
import {FORM_BUTTON, LOGIN_FROM_STYLE} from "./styles/StyleLogin";
import TLLogoLink from "../components/tacklelabs/TLLogoLink";
import TextField from "../components/basics/TextField";
import Password from "../components/basics/Password";
import Field from "../components/basics/Field";
import Email from "../components/basics/Email";
import CountryList from "../components/basics/CountryList";
import GenderList from "../components/basics/GenderList";
import {SING_UP_BODY_STYLE} from "./StyleSignUp";
import Button from "../components/basics/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {signIn} from "../redux/actions/registration";
import {Field as FormField, reduxForm} from "redux-form";
import {EMPTY} from "../values/ErrorsCode";
import backend from "../apis/backend";
import Authenticate from "../components/operation/Authenticate";
import "./../styles/wavesLogin.css";

class SignUp extends React.Component {


    state = {
        isMenuHidden: true,
        type: 2,
        errors: undefined,
    };

    changeType = (typeNumber) => {
        this.setState({type: typeNumber});
    };

    renderErrors = () => {
        if (this.state.errors !== undefined) {
            return (
                <div>
                    <Padding repeat={this.state.errors.length - 3}/>
                    <div className="ui bottom attached warning message">
                        {this.state.errors.map(error => {
                            return <div key={error}><i className="warning icon"/>{error}</div>
                        })}
                    </div>
                    <Padding small={true}/>
                </div>
            );
        } else {
            return <Padding repeat={4}/>;
        }
    };

    signUpActionCore = async (formValues) => {
        const response = await backend.post("/user/signup/", {...formValues, type: this.state.type});
        if (response.data.status_code === 603) {
            const list = [];
            for (let i = 0; i < response.data.data.validation_errors.length; i++) {
                list.push(response.data.data.validation_errors[i].field_error);
            }
            this.setState({errors: list});
        } else if (response.data.status_code === 605) {
            this.setState({errors: response.data.data.message})
        } else {
            this.props.signIn(response.data.data);
            this.setState({errors: undefined});
        }
    };

    renderLinks = () => {
        if (this.state.type === 1) {
            return (<div><Link to="#" onClick={() => {
                this.changeType(3)
            }}>Register as Petaint</Link>
                <br/><Link to="#" onClick={() => {
                    this.changeType(2)
                }}>Register as Developer</Link>
                <br/>
                <Link to="#" onClick={() => {
                    this.changeType(4)
                }}>Register as Supervisor</Link>
            </div>);
        } else if (this.state.type === 3) {
            return (<div>
                    <Link to="#" onClick={() => {
                        this.changeType(1)
                    }}>Register as Doctor</Link>
                    <br/><Link to="#" onClick={() => {
                    this.changeType(2)
                }}>Register as Developer</Link>
                    <br/>
                    <Link to="#" onClick={() => {
                        this.changeType(4)
                    }}>Register as Supervisor</Link>
                </div>
            );
        } else if (this.state.type === 2) {
            return (<div><Link to="#" onClick={() => {
                this.changeType(1)
            }}>Register as Doctor</Link>
                <br/><Link to="#" onClick={() => {
                    this.changeType(3)
                }}>Register as Petaint</Link>
                <br/>
                <Link to="#" onClick={() => {
                    this.changeType(4)
                }}>Register as Supervisor</Link>
            </div>);
        } else {
            return (
                <div>
                    <Link to="#" onClick={() => {
                        this.changeType(1)
                    }}>Register as Doctor</Link>
                    <br/>
                    <Link to="#" onClick={() => {
                        this.changeType(3)
                    }}>Register as Petaint</Link>
                    <br/>
                    <Link to="#" onClick={() => {
                        this.changeType(2)
                    }}>Register as Developer</Link>
                </div>
            );
        }
    };

    FirstNameField = (formProps) => {
        return (
            <TextField required={false}
                       placeholder="first name"
                       label="First Name"
                       {...formProps.input}
            />
        )
    };

    SecondNameField = (formProps) => {
        return (
            <TextField required={false}
                       placeholder="second name"
                       label="Second Name"
                       {...formProps.input}
            />
        )
    };

    MiddleNameField = (formProps) => {
        return (
            <TextField required={false}
                       placeholder="middle name"
                       label="Middle Name"
                       {...formProps.input}
            />
        )
    };

    LastNameField = (formProps) => {
        return (
            <TextField required={false}
                       placeholder="last name"
                       label="Last Name"
                       {...formProps.input}
            />
        )
    };

    EmailField = (formProps) => {
        return <Field label={<label>Email</label>} name="email"
                      field={<Email  {...formProps.input}/>}/>
    };

    PasswordField = (formProps) => {
        return <Field
            label={<label>Password</label>}
            field={<Password {...formProps.input}/>}
        />;
    };

    ConfirmPasswordField = (formProps) => {
        return <Field
            label={<label>Confirm Password</label>}
            field={<Password placeholder="confirm password" {...formProps.input}/>}
        />;
    };

    CityField = (formProps) => {
        return <TextField required={false} placeholder="city" label="City" {...formProps.input}/>;
    };

    StreetField = (formProps) => {
        return <TextField required={false} placeholder="street" label="Street" {...formProps.input}/>;
    };

    BirthDateField = (formProps) => {
        return (
            <Field>
                <label>Birth Date</label>
                <input type="date" {...formProps.input}/>
            </Field>
        );
    };

    CountryListField = (formProps) => {
        return <CountryList {...formProps.input}/>
    };

    GenderListField = (formProps) => {
        return <GenderList {...formProps.input}/>
    };

    renderForm = () => {
        return (
            <div className="ui segment" style={{paddingButton: "5", ...LOGIN_FROM_STYLE}}>
                {this.renderErrors()}
                <form className="ui form" onSubmit={this.props.handleSubmit(this.signUpActionCore)}>
                    <Grid>
                        <Row>
                            <Column size={4}>
                                <FormField name="first_name" component={this.FirstNameField}/>
                            </Column>
                            <Column size={4}>
                                <FormField name="second_name" component={this.SecondNameField}/>
                            </Column>
                            <Column size={1}/>
                            <Column size={6}>
                                <FormField name="email" component={this.EmailField}/>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={4}>
                                <FormField
                                    name="middle_name"
                                    component={this.MiddleNameField}
                                />
                            </Column>
                            <Column size={4}>
                                <FormField name="last_name" component={this.LastNameField}/>
                            </Column>
                            <Column size={1}/>
                            <Column size={6}>
                                <FormField name="password" component={this.PasswordField}/>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={4}>
                                <FormField name="gender" component={this.GenderListField}/>
                            </Column>
                            <Column size={4}>
                                <FormField name="country" component={this.CountryListField}/>
                            </Column>
                            <Column size={1}/>
                            <Column size={6}>
                                <FormField name="confirm_password" component={this.ConfirmPasswordField}/>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={4}>
                                <FormField name="city" component={this.CityField}/>
                            </Column>
                            <Column size={4}>
                                <FormField name="street" component={this.StreetField}/>
                            </Column>
                            <Column size={1}/>
                            <Column size={6}>
                                <FormField name="birth_date" component={this.BirthDateField}/>
                            </Column>
                        </Row>
                        <Row>
                            <Column size={8} style={{maxHeight:"0px"}}>
                                <Field label={<label>For more options:</label>} field={this.renderLinks()}/>
                            </Column>
                            <Column size={1}/>
                            <Column size={6}>
                                <label>&nbsp;&nbsp;&nbsp;</label>
                                <Field field={
                                    <Button type="submit" text="Sign Up"
                                            style={{...FORM_BUTTON, width: '100%', marginLeft: '0'}}/>}
                                />
                            </Column>
                        </Row>
                        <h5 className="ui vertical divider header" style={{marginLeft: '20px', height: '45%'}}>
                            MORE
                        </h5>
                    </Grid>
                </form>
            </div>
        );
    };

    renderPage = () => {
        return (
            <div>
                <TLLogoLink/>
                <img src={background} alt="back" style={SING_UP_BODY_STYLE}/>
                <Container>
                    <Grid>
                        <Row>
                            <Column size={3}/>
                            <Column size={12} style={{zIndex: 200, marginLeft: "30px"}}>
                                <div className="ui fluid image" style={{marginTop: '6%'}}>
                                    <div className="ui teal ribbon label" style={{
                                        fontSize: '1.5em',
                                        boxShadow: '0 5px 5px 0px rgba(0, 0, 0, 0.4)',
                                        zIndex: '55'
                                    }}>
                                        <i className="user icon"/> Sign Up
                                    </div>
                                </div>
                                {this.renderForm()}
                            </Column>
                            <Row/>
                            <Row/>
                        </Row>
                    </Grid>
                </Container>
            </div>
        );
    };


    render() {
        return (
            <Authenticate Ato="/" DComponent={
                <div className="waveWrapper waveAnimation" style={{marginTop: "-5px"}}>
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop"
                             style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png')"}}/>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle"
                             style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png')"}}/>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom"
                             style={{backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png')"}}/>
                    </div>
                    {this.renderPage()}
                </div>
            }/>
        );
    }
}

const validator = (formValues) => {
    const errors = {};
    if (!formValues.email) {
        errors.email = EMPTY;
    }
    if (!formValues.password) {
        errors.password = EMPTY;
    }
    if (!formValues.first_name) {
        errors.first_name = EMPTY;
    }
    if (!formValues.second_name) {
        errors.second_name = EMPTY;
    }
    if (!formValues.middle_name) {
        errors.middle_name = EMPTY;
    }
    if (!formValues.last_name) {
        errors.last_name = EMPTY;
    }
    if (!formValues.gender) {
        errors.gender = EMPTY;
    }
    if (!formValues.country) {
        errors.country = EMPTY;
    }
    if (!formValues.birth_date) {
        errors.country = EMPTY;
    }
    if (!formValues.city) {
        errors.country = EMPTY;
    }
    if (formValues.password !== formValues.confirm_password) {
        errors.confirm_password = EMPTY;
    }
    return errors;
};

const ConnectSignUp = connect(null, {signIn})(SignUp);

export default reduxForm({
    form: 'signUp'
    , validate: validator
})(ConnectSignUp);