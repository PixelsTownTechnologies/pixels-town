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



class ViewModels extends React.Component {

    state = {};

    constructor(props) {
        super(props);
        this.props.getUser();
    }


    staticCode = () => {
        return this.props.user.institution !== undefined;
    };


    renderPage = () => {
        return (
            <Container style={{marginTop:"65px"}}>
                <Grid>
                    <Row>
                        <Column size={2}/>
                        <Column size={12}>
                            Test
                        </Column>
                        <Column size={2}/>
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

export default connect(mapStateToProps, {getUser})(ViewModels);