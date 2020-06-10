import React from 'react';
import Field from "../components/basics/Field";
import Row from "../components/layout/Row";
import Container from "../components/layout/Container";
import Column from "../components/layout/Column";
import Grid from "../components/layout/Grid";
import background from '../images/loginbg.jpeg';
import {Link} from "react-router-dom";
import Password from "../components/basics/Password";
import Padding from "../components/basics/Padding";
import Email from "../components/basics/Email";
import LabelTeal from "../components/basics/LabelTeal";
import Button from "../components/basics/Button";
import URLQuestion from "../components/basics/URLQuestion";
import {Field as FormField, reduxForm} from "redux-form";
import {EMPTY} from "../values/ErrorsCode";
import {
    BOX_SHADOW_FIELD,
    BOX_SHADOW_LABEL,
    FORGOT_PASSWORD,
    FORM_BUTTON,
    LOGIN_BODY_STYLE,
    LOGIN_FROM_STYLE
} from "./styles/StyleLogin";
import TLLogoLink from "../components/tacklelabs/TLLogoLink";
import backend from "../apis/backend";
import {signIn} from "../redux/actions/registration";
import {connect} from "react-redux";
import Authenticate from "../components/operation/Authenticate";
import "./../styles/wavesLogin.css";
class Login extends React.Component {

    state = {
        isMenuHidden: true,
        isUpdate: false,
        errorMsg: undefined,
    };

    signInActionCore = async (formValues) => {
        const response = await backend.post("/user/login/", formValues);
        if (response.data.status_code === 603) {
            this.setState({errorMsg: response.data.data.validation_errors[0].field_error})
        } else if (response.data.status_code === 605) {
            this.setState({errorMsg: response.data.data.message})
        } else {
            this.props.signIn(response.data.data);
        }
    };

    renderErrors = () => {
        if (this.state.errorMsg !== undefined) {
            return (
                <div>
                    <Padding repeat={3}/>
                    <div className="ui bottom attached warning message">
                        <i className="warning icon"/>
                        {this.state.errorMsg}
                    </div>
                    <Padding small={true}/>
                </div>
            );
        } else {
            return <Padding repeat={4}/>;
        }
    };

    EmailField = (formProps) => {
        return (
            <Field>
                <LabelTeal style={{boxShadow: BOX_SHADOW_LABEL}} text="Email"/>
                <Padding small={true}/>
                <Email style={{boxShadow: BOX_SHADOW_FIELD}}
                       error={formProps.meta.error}
                       touched={formProps.meta.touched}
                       {...formProps.input}
                />
            </Field>
        )
    };

    PasswordField = (formProps) => {
        return (
            <Field>
                <LabelTeal style={{boxShadow: BOX_SHADOW_LABEL}} text="Password"/>
                <Padding small={true}/>
                <Password
                    style={{boxShadow: BOX_SHADOW_FIELD}}
                    error={formProps.meta.error}
                    touched={formProps.meta.touched}
                    {...formProps.input}
                />
            </Field>
        )
    };

    renderForm = () => {
        return (
            <div className="ui segment" style={LOGIN_FROM_STYLE}>
                {this.renderErrors()}
                <form className="ui form" onSubmit={this.props.handleSubmit(this.signInActionCore)}>
                    <FormField name="email" component={this.EmailField}/>
                    <FormField name="password" component={this.PasswordField}/>
                    <Link to="/forgot-password" style={FORGOT_PASSWORD}>Forgot password ?</Link>
                    <Padding repeat={2}/>
                    <Button type="submit" text="Sign In" style={FORM_BUTTON}/>
                    <URLQuestion to="/sign-up" question=" Don't have an account ?" linkText="Create account"/>
                </form>
            </div>
        );
    };

    renderPage = () =>{
      return (
          <div style={{zIndex:45555}}>
              <TLLogoLink/>
              <Container>
                  <Grid>
                      <Row/><Row/><Row/><Row/>
                      <Row>
                          <Column size={5}/>
                          <Column size={6} style={{zIndex:200}}>
                              <div className="ui fluid image" style={{marginTop: '6%'}}>
                                  <div className="ui teal ribbon label" style={{
                                      fontSize: '1.5em',
                                      boxShadow: '0 5px 5px 0px rgba(0, 0, 0, 0.4)',
                                      zIndex: '55'
                                  }}>
                                      <i className="user icon"/> Sign In
                                  </div>
                              </div>
                              {this.renderForm()}
                          </Column>
                          <Column size={5}/>
                      </Row>
                  </Grid>
              </Container>
          </div>
      );
    };

    render() {
        return (
            <Authenticate Ato="/" DComponent={
                <div className="waveWrapper waveAnimation" style={{marginTop:"-5px"}}>
                    <div className="waveWrapperInner bgTop">
                        <div className="wave waveTop"
                             style={{backgroundImage:"url('http://front-end-noobs.com/jecko/img/wave-top.png')"}}/>
                    </div>
                    <div className="waveWrapperInner bgMiddle">
                        <div className="wave waveMiddle"
                             style={{backgroundImage:"url('http://front-end-noobs.com/jecko/img/wave-mid.png')"}}/>
                    </div>
                    <div className="waveWrapperInner bgBottom">
                        <div className="wave waveBottom"
                             style={{backgroundImage:"url('http://front-end-noobs.com/jecko/img/wave-bot.png')"}}/>
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
    return errors;
};


const ConnectLogin = connect(null, {signIn})(Login);

export default reduxForm({
    form: 'signIn'
    , validate: validator
    , enableReinitialize: true
})(ConnectLogin);