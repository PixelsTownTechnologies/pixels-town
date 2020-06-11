import React from 'react';
import {Link} from "react-router-dom";
import '../../styles/Home.css'
import Authenticate from "../../components/operation/Authenticate";
import Grid from "../../components/layout/Grid";
import Row from "../../components/layout/Row";
import Column from "../../components/layout/Column";
import Container from "../../components/layout/Container";
import Bar from "./Bar";
import TextField from "../../components/basics/TextField";
import Button from "../../components/basics/Button";
import EmptyButton from "../../components/basics/EmptyButton";
import backend from "../../apis/backend";
import {connect} from "react-redux";
import {getUser, updateUserData} from "../../redux/actions/registration";
import Password from "../../components/basics/Password";
import Field from "../../components/basics/Field";
import Padding from "../../components/basics/Padding";
import CountryList from "../../components/basics/CountryList";
import logoApp from "../../images/logo.png";
import UserMenu from "../UserMenu";

class Account extends React.Component {

    state = {
        user: {},
        first_name: "",
        second_name: "",
        middle_name: "",
        last_name: "",
        old_password: "",
        new_password: "",
        confirm_password: "",
        country: "",
        street: "",
        city: "",
        phone_number: "",
        photo: "",
        isContactEdit: false,
        isNamesEdit: false,
        isPasswordEdit: false,
        isAddressEdit: false,
        contactFieldDisable: true,
        nameFieldDisable: true,
        passwordFieldDisable: true,
        addressFieldDisable: true,
    };


    constructor(props) {
        super(props);
        this.props.getUser();
    }

    loadUserData = (userData, reload = false) => {
        if (this.state.user.id === undefined || reload) {
            this.setState({user: userData});
            this.setState({first_name: userData.first_name});
            this.setState({second_name: userData.second_name});
            this.setState({middle_name: userData.middle_name});
            this.setState({last_name: userData.last_name});
            this.setState({country: userData.country});
            this.setState({street: userData.street});
            this.setState({city: userData.city});
        }
    };


    /* Name Start*/
    cancelNameFrameHandler = () => {
        this.setState({
            isNamesEdit: false,
            nameFieldDisable: true
        });
        this.loadUserData(this.state.user, true);
    };

    saveNameFrameHandler = async () => {
        const url = "user/" + this.state.user.id + "/update/";
        const data = {
            first_name: this.state.first_name,
            second_name: this.state.second_name,
            middle_name: this.state.middle_name,
            last_name: this.state.last_name,
        };
        const response = await backend.put(url, data);
        if (response.data.status_code === 200) {
            this.props.updateUserData(data);
            const newUser = {...this.state.user, ...data};
            this.setState({
                isNamesEdit: false,
                nameFieldDisable: true,
                user: newUser
            });
        }
    };

    editNameFrameHandler = () => {
        this.setState({
            isNamesEdit: true,
            nameFieldDisable: false
        })
    };

    renderNameFormButtons = () => {
        if (!this.state.isNamesEdit) {
            return (
                <Row>
                    <Column size={3}>
                        <EmptyButton text="Edit" onClick={this.editNameFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Column size={2}>
                        <Button text="Save" onClick={this.saveNameFrameHandler}/>
                    </Column>
                    <Column size={2}>
                        <EmptyButton text="Cancel" onClick={this.cancelNameFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        }
    };

    renderProfileForm = () => {
        return (
            <Grid>
                <Row>
                    <Column size={7}>
                        <TextField label="First Name" placeholder="first name"
                                   value={this.state.first_name}
                                   required={false}
                                   onChange={(e) => {
                                       this.setState({first_name: e.target.value})
                                   }}
                                   disabled={this.state.nameFieldDisable}
                        />
                    </Column>
                    <Column size={1}/>
                    <Column size={7}>
                        <TextField label="Second Name" placeholder="second name"
                                   value={this.state.second_name}
                                   required={false}
                                   onChange={(e) => {
                                       this.setState({second_name: e.target.value})
                                   }}
                                   disabled={this.state.nameFieldDisable}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column size={7}>
                        <TextField label="Middle Name" placeholder="middle name"
                                   value={this.state.middle_name}
                                   required={false}
                                   onChange={(e) => {
                                       this.setState({middle_name: e.target.value})
                                   }}
                                   disabled={this.state.nameFieldDisable}
                        />
                    </Column>
                    <Column size={1}/>
                    <Column size={7}>
                        <TextField label="Last Name" placeholder="last name"
                                   value={this.state.last_name}
                                   required={false}
                                   onChange={(e) => {
                                       this.setState({last_name: e.target.value})
                                   }}
                                   disabled={this.state.nameFieldDisable}
                        />
                    </Column>
                </Row>
                {this.renderNameFormButtons()}
            </Grid>
        );
    };
    /* Name End*/


    /* Password Start*/
    cancelPasswordFrameHandler = () => {
        this.setState({
            isPasswordEdit: false,
            passwordFieldDisable: true,
            old_password: "",
            new_password: "",
            confirm_password: "",
        });
    };

    savePasswordFrameHandler = async () => {
        const url = "user/" + this.state.user.id + "/change_password/";
        if (this.state.new_password === this.state.confirm_password) {
            const data = {
                old_password: this.state.old_password,
                new_password: this.state.new_password,
            };
            const response = await backend.put(url, data);
            if (response.data.status_code === 200) {
                this.setState({
                    isPasswordEdit: false,
                    passwordFieldDisable: true,
                    old_password: "",
                    new_password: "",
                    confirm_password: "",
                });
            }
        }
    };

    editPasswordFrameHandler = () => {
        this.setState({
            isPasswordEdit: true,
            passwordFieldDisable: false
        })
    };

    renderPasswordFormButtons = () => {
        if (!this.state.isPasswordEdit) {
            return (
                <Row>
                    <Column size={3}>
                        <EmptyButton text="Edit" onClick={this.editPasswordFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Column size={2}>
                        <Button text="Save" onClick={this.savePasswordFrameHandler}/>
                    </Column>
                    <Column size={2}>
                        <EmptyButton text="Cancel" onClick={this.cancelPasswordFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        }
    };

    renderPasswordForm = () => {
        return (
            <Grid>
                <Row>
                    <Column size={12}>
                        <Field required={false}>
                            <label>Old Password</label>
                            <Padding small={true}/>
                            <Password placeholder="old password"
                                      value={this.state.old_password}
                                      onChange={(e) => {
                                          this.setState({old_password: e.target.value})
                                      }}
                                      disabled={this.state.passwordFieldDisable}
                            />
                        </Field>
                    </Column>
                    <Column size={4}/>
                </Row>
                <Row>
                    <Column size={12}>
                        <Field required={false}
                               label={<label>New Password</label>}
                               field={<Password
                                   placeholder="new password"
                                   value={this.state.new_password}
                                   onChange={(e) => {
                                       this.setState({new_password: e.target.value})
                                   }}
                                   disabled={this.state.passwordFieldDisable}
                               />}
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                <Row>
                    <Column size={12}>
                        <Field required={false}
                               label={<label>Confirm New Password</label>}
                               field={<Password
                                   placeholder="confirm password"
                                   value={this.state.confirm_password}
                                   onChange={(e) => {
                                       this.setState({confirm_password: e.target.value})
                                   }}
                                   disabled={this.state.passwordFieldDisable}
                               />}
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                {this.renderPasswordFormButtons()}
            </Grid>
        );
    };
    /* Password End*/


    /* Address Start*/
    cancelAddressFrameHandler = () => {
        this.setState({
            isAddressEdit: false,
            addressFieldDisable: true
        });
        this.loadUserData(this.state.user, true);
    };

    saveAddressFrameHandler = async () => {
        const url = "user/" + this.state.user.id + "/update/";
        const data = {
            country: this.state.country,
            street: this.state.street,
            city: this.state.city,
        };
        const response = await backend.put(url, data);
        if (response.data.status_code === 200) {
            this.props.updateUserData(data);
            const newUser = {...this.state.user, ...data};
            this.setState({
                isAddressEdit: false,
                addressFieldDisable: true,
                user: newUser
            });
        }
    };

    editAddressFrameHandler = () => {
        this.setState({
            isAddressEdit: true,
            addressFieldDisable: false,
        })
    };

    renderAddressFormButtons = () => {
        if (!this.state.isAddressEdit) {
            return (
                <Row>
                    <Column size={3}>
                        <EmptyButton text="Edit" onClick={this.editAddressFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Column size={2}>
                        <Button text="Save" onClick={this.saveAddressFrameHandler}/>
                    </Column>
                    <Column size={2}>
                        <EmptyButton text="Cancel" onClick={this.cancelAddressFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        }
    };

    renderAddressForm = () => {
        return (
            <Grid>
                <Row>
                    <Column size={12}>
                        <CountryList
                            value={this.state.country}
                            onChange={(e) => {
                                this.setState({country: e.target.value})
                            }}
                            disabled={this.state.addressFieldDisable}
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                <Row>
                    <Column size={12}>
                        <TextField label="City" placeholder="city"
                                   value={this.state.city}
                                   required={false}
                                   onChange={(e) => {
                                       this.setState({city: e.target.value})
                                   }}
                                   disabled={this.state.addressFieldDisable}
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                <Row>
                    <Column size={12}>
                        <TextField label="Street" placeholder="street"
                                   value={this.state.street}
                                   required={false}
                                   onChange={(e) => {
                                       this.setState({street: e.target.value})
                                   }}
                                   disabled={this.state.addressFieldDisable}
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                {this.renderAddressFormButtons()}
            </Grid>
        );
    };
    /* Address End*/


    /* Contact Start*/
    cancelContactFrameHandler = () => {
        this.setState({
            isContactEdit: false,
            contactFieldDisable: true
        });
        this.loadUserData(this.state.user, true);
    };

    saveContactFrameHandler = async () => {
        const url = "user/" + this.state.user.id + "/update/";
        const data = {
            phone_number: this.state.phone_number,
        };
        var formData = new FormData();
        formData.append("photo", this.state.photo);
        formData.append("phone_number", this.state.phone_number);
        const response = await backend.put(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data.status_code === 200) {
            this.props.updateUserData(data);
            const newUser = {...this.state.user, ...data};
            this.setState({
                isContactEdit: false,
                contactFieldDisable: true,
                user: newUser
            });
        }
    };

    editContactFrameHandler = () => {
        this.setState({
            isContactEdit: true,
            contactFieldDisable: false
        })
    };

    renderContactFormButtons = () => {
        if (!this.state.isContactEdit) {
            return (
                <Row>
                    <Column size={3}>
                        <EmptyButton text="Edit" onClick={this.editContactFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Column size={2}>
                        <Button text="Save" onClick={this.saveContactFrameHandler}/>
                    </Column>
                    <Column size={2}>
                        <EmptyButton text="Cancel" onClick={this.cancelContactFrameHandler}/>
                    </Column>
                    <Column size={12}/>
                </Row>
            );
        }
    };

    renderContactForm = () => {
        return (
            <Grid>
                <Row>
                    <Column size={12}>
                        <Field required={false} field={
                            <input type="file"
                                   autoComplete="off"
                                   alt="photo"
                                   src={this.state.photo}
                                   onChange={(e) => {
                                       this.setState({photo: e.target.files[0]})
                                   }}
                                   disabled={this.state.contactFieldDisable}
                            />
                        }
                               label={
                                   <label>Photo</label>
                               }
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                <Row>
                    <Column size={12}>
                        <TextField label="Phone Number" placeholder="xxxx-xxxx-xxx"
                                   value={this.state.phone_number}
                                   required={false}
                                   autoComplete="off"
                                   onChange={(e) => {
                                       this.setState({phone_number: e.target.value})
                                   }}
                                   disabled={this.state.contactFieldDisable}
                        />
                    </Column>
                    <Column size={4}/>
                </Row>
                {this.renderContactFormButtons()}
            </Grid>
        );
    };

    /* Contact End*/

    render() {
        return (
            <Authenticate loadData={this.loadUserData} Dto="/" AComponent={
                <div>
                    <UserMenu/>
                    <Grid style={{marginTop: '10px'}}>
                        <Bar user={this.state.user}/>
                        <Row>
                            <Column size={16}>
                                <div className="ui secondary pointing menu">
                                    <Container>
                                        <Link to="account" className="active item">
                                            <h5>Account</h5>
                                        </Link>
                                        <Link to="medical-profile" className="item">
                                            <h5>Medical Profile</h5>
                                        </Link>
                                        <Link to="mail" className="item">
                                            <h5>Mail</h5>
                                        </Link>
                                        <Link to="my-reports" className="item">
                                            <h5>My Reports</h5>
                                        </Link>
                                    </Container>
                                </div>
                            </Column>
                        </Row>
                        <Row>
                            <Container>
                                <Grid>
                                    <Row>
                                        <Column size={4}>
                                            <Row><h3 style={{color: '#00c5b8'}}>Profile</h3></Row>
                                            <Row><p style={{width: '220px'}}>You can change your name or general
                                                data.</p></Row>
                                        </Column>
                                        <Column size={1}/>
                                        <Column size={11}>
                                            <div className="ui form">
                                                {this.renderProfileForm()}
                                            </div>

                                        </Column>
                                    </Row>
                                    <div className="ui section divider"/>
                                    <Row>

                                        <Column size={4}>
                                            <Row><h3 style={{color: '#00c5b8'}}>Password</h3></Row>
                                            <Row><p style={{width: '220px'}}>You can change your Password one time every
                                                week.</p></Row>
                                        </Column>
                                        <Column size={1}/>
                                        <Column size={11}>
                                            <div className="ui form">
                                                {this.renderPasswordForm()}
                                            </div>

                                        </Column>
                                    </Row>
                                    <div className="ui section divider"/>
                                    <Row>

                                        <Column size={4}>
                                            <Row><h3 style={{color: '#00c5b8'}}>Address</h3></Row>
                                            <Row><p style={{width: '220px'}}>You change address.</p></Row>
                                        </Column>
                                        <Column size={1}/>
                                        <Column size={11}>
                                            <div className="ui form">
                                                {this.renderAddressForm()}
                                            </div>

                                        </Column>
                                    </Row>
                                    <div className="ui section divider"/>
                                    <Row>

                                        <Column size={4}>
                                            <Row><h3 style={{color: '#00c5b8'}}>Contact Info</h3></Row>
                                            <Row><p style={{width: '220px'}}>You change your phone number and your
                                                photo.</p></Row>
                                        </Column>
                                        <Column size={1}/>
                                        <Column size={11}>
                                            <div className="ui form">
                                                {this.renderContactForm()}
                                            </div>

                                        </Column>
                                    </Row>
                                </Grid>
                            </Container>
                        </Row>
                    </Grid>
                    <div className="ui section divider"/>
                    <div className="ui bottom menu" style={{color: "white", backgroundColor: "#222"}}>
                        <Container style={{width: "36%", marginLeft: "32%"}}>
                            <Link to="about" style={{marginLeft: "6%", marginTop: "10px", color: "#fff"}}>About</Link>
                            <Link to="supports"
                                  style={{marginLeft: "6%", marginTop: "10px", color: "#fff"}}>Supports</Link>
                            <Link to="about" style={{marginLeft: "6%", marginTop: "10px", color: "#fff"}}>Help</Link>
                            <img
                                to="/"
                                className="ui circle link image"
                                src={logoApp} alt="logoApp"
                                style={{marginLeft: "10%", marginTop: "10px", width: "20px", height: "20px"}}
                            />
                            <Link to="about" style={{marginLeft: "6%", marginTop: "10px", color: "#fff"}}>Team</Link>
                            <Link to="about" style={{marginLeft: "6%", marginTop: "10px", color: "#fff"}}>Apis</Link>
                            <Link to="supports"
                                  style={{marginLeft: "6%", marginTop: "10px", color: "#fff"}}>Status</Link>
                        </Container>
                    </div>
                </div>
            }
            />
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {updateUserData, getUser})(Account);