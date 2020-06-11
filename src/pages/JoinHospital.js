import React from 'react';
import {Link, Redirect} from "react-router-dom";
import '../styles/Home.css'
import Grid from "../components/layout/Grid";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import backend from "../apis/backend";
import HospitalCard from "../components/card/HospitalCard";
import Dimmer from "../components/basics/Dimmer";
import TextField from "../components/basics/TextField";
import EmptyButton from "../components/basics/EmptyButton";
import {connect} from "react-redux";
import {addHospital, getUser} from "../redux/actions/registration";
import UserType from "../components/operation/UserType";
import UserMenu from "./UserMenu";

class JoinHospital extends React.Component {
    state = {
        user: {},
        hospitals: [],
        searchValue: "",
        active: false,
        error: false,
        hospitalActive: {},
        joinRequestTitle: "",
        joinRequestDescription: "",
        forceUpdate: false,
    };

    constructor(props) {
        super(props);
        this.props.getUser();
    }

    showJoinRequestDialog = (hospital) => {
        this.setState({
            active: true,
            hospitalActive: hospital
        });
    };

    componentDidMount = async () => {
        const response = await backend.get("/fetch_hospitals");
        this.setState({hospitals: response.data.data.hospitals});
    };


    resetActive = (active) => {
        this.setState({active: active});
    };

    joinRequestSendAction = async () => {
        const url = "/user/" + this.props.user.id + "/hospital_join_request/";
        const data = {
            hospital: this.state.hospitalActive.id,
            title: this.state.joinRequestTitle,
            msg: this.state.joinRequestDescription
        };
        const response = await backend.post(url, data);
        if (response.data.status_code === 200) {
            this.props.addHospital({join_institution: response.data.data.join_institution});
            this.setState({active: false});
        }

    };

    searchAction = async () => {
        if (this.props.user.join_institution !== undefined) {
            this.setState({error: true});
            return undefined;
        }
        const url = "user/" + this.props.user.id + "/search_hospitals/?search=" + this.state.searchValue;
        const response = await backend.get(url);
        this.setState({hospitals: response.data.data.hospitals});
    };

    cancelJoinRequest = async () => {
        const url = "/user/" + this.props.user.id + "/cancel_join_request/" + this.props.user.join_institution.id;
        const response = await backend.delete(url);
        if (response.data.status_code === 200) {
            this.props.addHospital({join_institution: undefined});
            this.setState({active: false, forceUpdate: true});
        }
    };

    renderHospitals = () => {
        if (this.props.user.join_institution !== undefined) {
            return <HospitalCard join_institution={this.props.user.join_institution} isCancel={true}
                                 onClickButton={this.cancelJoinRequest}/>
        }

        if (this.state.hospitals.length > 0) {
            return (this.state.hospitals.map(item => {
                return <HospitalCard key={item.id} hospital={item} onClickButton={() => {
                    this.showJoinRequestDialog(item)
                }}/>;
            }));
        } else {
            return (

                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="search icon"/>
                        We don't have any hospital matching your search
                    </div>
                    <div className="inline">
                        <div
                            className="ui primary button"
                            onClick={() => {
                                this.setState({searchValue: ""});
                                this.searchAction()
                            }}>
                            Clear Search
                        </div>
                        <Link to="/create-hospital" className="ui button">Create Hospital</Link>
                    </div>
                </div>

            );
        }

    };

    render() {
        if (this.props.user.institution !== undefined) {
            return <Redirect to="/"/>;
        } else if (this.props.user.join_institution !== undefined) {
            return (
                <UserType
                    asFunction={false}
                    doctor={
                        <div>
                            <UserMenu/>
                            <Grid style={{backgroundColor: "white", marginTop: "4%"}}>
                                <Row/>
                                <Row>
                                    <Column size={3}/>
                                    <Column size={10}>
                                        <h2 className="ui header">
                                            <i className="search icon"/>
                                            <div className="content">
                                                Search to join hospital
                                            </div>
                                        </h2>
                                    </Column>
                                    <Column size={3}/>
                                </Row>
                                <Row>
                                    <Column size={3}/>
                                    <Column size={10}>
                                        <div className="ui action input" style={{width: "100%", height: "40px"}}>
                                            <input
                                                type="text"
                                                placeholder="Search hospital..."
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
                                <Row/><Row/>
                                <Row>
                                    <Column size={3}/>
                                    <Column size={10}>
                                        {this.renderHospitals()}
                                    </Column>
                                    <Column size={3}/>
                                </Row>
                            </Grid>
                        </div>
                    }
                    none={
                        <Redirect to="/"/>
                    }
                />);
        }
        return (
            <UserType
                asFunction={false}
                doctor={
                    <div>
                        <UserMenu/>
                        <Grid style={{backgroundColor: "white", marginTop: "4%"}}>
                            <Row/>
                            <Row>
                                <Column size={3}/>
                                <Column size={10}>
                                    <h2 className="ui header">
                                        <i className="search icon"/>
                                        <div className="content">
                                            Search to join hospital
                                        </div>
                                    </h2>
                                </Column>
                                <Column size={3}/>
                            </Row>
                            <Row>
                                <Column size={3}/>
                                <Column size={10}>
                                    <div className="ui action input" style={{width: "100%", height: "40px"}}>
                                        <input
                                            type="text"
                                            placeholder="Search hospital..."
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
                            <Row/><Row/>
                            <Row>
                                <Column size={3}/>
                                <Column size={10}>
                                    {this.renderHospitals()}
                                </Column>
                                <Column size={3}/>
                            </Row>
                        </Grid>

                        <Dimmer active={this.state.active} reset={this.resetActive}>
                            <div className="ui field" style={{textAlign: "left", fontSize: "1.4em"}}>
                                <label><i className="paper plane outline icon"/>Join Request</label>
                            </div>
                            <div className="ui field">
                                <label style={{textAlign: "left"}}>Title</label>
                                <TextField
                                    placeholder="title"
                                    style={{fontSize: "1.1em"}}
                                    value={this.state.joinRequestTitle}
                                    autoComplete={false}
                                    required={false}
                                    onChange={
                                        (e) => {
                                            this.setState({joinRequestTitle: e.target.value})
                                        }
                                    }
                                />
                            </div>
                            <div className="ui field">
                                <label style={{textAlign: "left"}}>Message</label>
                                <textarea
                                    placeholder="message"
                                    value={this.state.joinRequestDescription}
                                    autoComplete={false}
                                    style={{fontSize: "1.1em"}}
                                    onChange={
                                        (e) => {
                                            this.setState({joinRequestDescription: e.target.value})
                                        }
                                    }
                                />
                            </div>
                            <div className="ui field">
                                <EmptyButton text="Send" style={{width: "200px"}} onClick={this.joinRequestSendAction}/>
                            </div>
                        </Dimmer>
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

export default connect(mapStateToProps, {addHospital, getUser})(JoinHospital);