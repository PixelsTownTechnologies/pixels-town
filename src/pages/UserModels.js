import React from "react";
import Authenticate from "../components/operation/Authenticate";
import {connect} from "react-redux";
import {getUser} from "../redux/actions/registration";
import {addModels, getModels} from "../redux/actions/models";
import UserType from "../components/operation/UserType";
import {Redirect} from "react-router-dom";
import UserMenu from "./UserMenu";
import Container from "../components/layout/Container";
import Grid from "../components/layout/Grid";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import backend from "../apis/backend";
import ModelSubscriptionCard from "../components/card/ModelSubscriptionCard";
import {MODEL_INITIAL_VALUE} from "../redux/InitialValues";

class UserModels extends React.Component {

    state = {
        pageLoading: false,
        selectModel: undefined,
    };

    constructor(props) {
        super(props);
        this.props.getUser();
        this.props.getModels();
    }

    componentDidMount = async () => {
        if(this.props.user === undefined){
            return undefined;
        }
        if (this.props.models === MODEL_INITIAL_VALUE) {
            const url = "/user/" + this.props.user.id + "/fetch_subscription";
            const response = await backend.get(url, {search: this.state.searchValue});
            if (response.data.status_code === 200) {
                if (response.data.data.hospital_model_subscriptions !== undefined) {
                    this.props.addModels({
                        hospitalSubscriptions: response.data.data.hospital_model_subscriptions,
                        subscriptions: response.data.data.model_subscriptions
                    });
                } else {
                    this.props.addModels({
                        hospitalSubscriptions: MODEL_INITIAL_VALUE.hospitalSubscriptions,
                        subscriptions: response.data.data.model_subscriptions
                    });
                }
            }
        }
        this.setState({pageLoading: true});
    };

    staticCode = () => {
        return true;
    };

    renderCards = () => {

        if (this.props.models.subscriptions.length === 0) {
            return (<div/>);
        }

        const list1 = this.props.models.subscriptions.map((item, key) => {
            return (
                <Column size={4} style={{marginTop: "50px"}}>
                    <ModelSubscriptionCard key={key} subscription={item} openButtonAciton={() => {
                        this.setState({selectModel: item})
                    }}/>
                </Column>
            );
        });
        const list2 = this.props.models.hospitalSubscriptions.map((item, key) => {
            return (
                <Column size={4} style={{marginTop: "50px"}}>
                    <ModelSubscriptionCard key={key} subscription={item} hospital={true} openButtonAciton={() => {
                        this.setState({selectModel: item})
                    }}/>
                </Column>
            );
        });
        return [...list2, ...list1];
    };

    renderPage = () => {
        if (!this.state.pageLoading) {
            return (
                <div>
                    <div className="ui large active text loader">Loading your models</div>
                </div>
            );
        }
        if (this.state.pageLoading && this.props.models.subscriptions.length === 0) {
            return (

                <div className="ui placeholder segment" style={{width: "100%", height: "100%"}}>
                    <div className="ui icon header">
                        <i className="search icon"/>
                        You don't have any model !
                    </div>
                    <div className="inline">
                        <div
                            className="ui primary button"
                            onClick={() => {
                                this.setState({searchValue: ""});
                                this.searchAction()
                            }}>
                            Get One
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Container>
                <Grid>
                    <Row/><Row/>
                    <Row>
                        {this.renderCards()}
                    </Row>
                    <Row/><Row/>
                </Grid>
            </Container>
        );
    };

    render() {
        if (!this.staticCode()) {
            return <div />;
        }
        if (this.state.selectModel !== undefined) {
            return <Redirect to={{pathname: "/model-request", model: this.state.selectModel}}/>;
        }
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
                            <div style={{backgroundColor: "#f1f2f5"}}>
                                <UserMenu/>
                                {this.renderPage()}
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
    return {user: state.user.user, models: state.model.models};
};

export default connect(mapStateToProps, {getUser, getModels, addModels})(UserModels);