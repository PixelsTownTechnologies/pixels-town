import React from 'react';
import '../styles/Home.css'
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import Grid from "../components/layout/Grid";
import HomeBackground from "../images/HomeBackground.png";
import Container from "../components/layout/Container";
import {Link} from "react-router-dom";
import HomeMenu from "../components/others/HomeMenu";
import Authenticate from "../components/operation/Authenticate";
import {connect} from "react-redux";
import {getUser, signIn} from "../redux/actions/registration";
import ImageURL from "../apis/ImageURL";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.props.getUser();
    }

    renderName = () => {
        if (this.props.user.type.type === "Doctor") {
            return "Dr." + this.props.user.first_name + " " + this.props.user.last_name;
        } else {
            if (this.props.user.gender === "m") {
                return "Mr." + this.props.user.first_name + " " + this.props.user.last_name;
            } else {
                return "Ms." + this.props.user.first_name + " " + this.props.user.last_name;
            }
        }
    };

    renderUnAuthenticationPage = () => {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <HomeMenu/>
                <Grid style={{background: "linear-gradient(to top, #68306f 20%, #49214d 80%)"}}>
                    <Row className="row">
                        <Column size={8} style={{width: "100%", height: "100%"}}>
                            <Container>
                                <Grid>
                                    <Row/><Row/><Row/><Row/>
                                    <Row/><Row/><Row/>
                                    <Row style={{color: "#fff", fontSize: "3.5em"}}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            Welcome Into
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{color: "#fff", fontSize: "3.5em", marginTop: "5px"}}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            TackleLabs
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{
                                        color: "#eeeeee",
                                        fontSize: "1.2em",
                                        marginTop: "5px",
                                        fontStyle: "italic"
                                    }}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            <p>
                                                TackleLabs is Hub provide multiple of services
                                                and connect many sectors to provide better services.
                                            </p>
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{
                                        color: "#eeeeee",
                                        fontSize: "1.2em",
                                        marginTop: "5px",
                                        fontStyle: "italic"
                                    }}>
                                        <Column size={3}/>
                                        <Column size={3}>
                                            <Link className="ui teal button" to="/sign-up"
                                                  style={{borderRadius: "20px", fontSize: "0.9em"}}>Sign-up</Link>
                                        </Column>
                                        <Column size={4} style={{marginTop: "8px"}}>
                                            <Link to="/login" style={{color: "#fff", marginLeft: "-22px"}}>I have
                                                account !</Link>
                                        </Column>
                                        <Column size={7}/>
                                    </Row>
                                </Grid>
                            </Container>
                        </Column>
                        <Column size={8} style={{width: "100%", height: "100%"}}>
                            <img src={HomeBackground} alt="homepage"
                                 style={{width: "90%", marginTop: "10.4%", marginLeft: "-8%"}}/>
                        </Column>
                    </Row>
                    <Row/>
                </Grid>
            </div>
        );
    };

    renderAuthenticationPage = () => {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <HomeMenu/>
                <Grid style={{background: "linear-gradient(to top, #68306f 20%, #49214d 80%)"}}>
                    <Row className="row">
                        <Column size={8} style={{width: "100%", height: "100%"}}>
                            <Container>
                                <Grid>
                                    <Row/><Row/><Row/><Row/>
                                    <Row style={{color: "#fff", fontSize: "3.5em"}}>
                                        <Column size={3}/>
                                        <Column size={7}>
                                            <div
                                                style={{
                                                    borderRadius: "50%",
                                                    width: "250px",
                                                    height: "250px",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    marginLeft:"25px"
                                                }}
                                            >
                                                <img
                                                    style={{}}
                                                    className="ui image"
                                                    src={ImageURL + this.props.user.photo}
                                                    alt="user photo"
                                                />
                                            </div>
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{color: "#fff", fontSize: "3.5em"}}>
                                        <Column size={5}/>
                                        <Column size={6}>
                                            Hello
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{color: "#fff", fontSize: "3.0em", marginTop: "5px"}}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            {this.renderName()}
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                </Grid>
                            </Container>
                        </Column>
                        <Column size={8} style={{width: "100%", height: "100%"}}>
                            <img src={HomeBackground} alt="homepage"
                                 style={{width: "90%", marginTop: "10.4%", marginLeft: "-8%"}}/>
                        </Column>
                    </Row>
                    <Row/>
                </Grid>
            </div>
        );
    };

    render() {
        return (
            <Authenticate
                AComponent={
                    this.renderAuthenticationPage
                }
                DComponent={
                    this.renderUnAuthenticationPage
                }
            />
        );
    }
}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser, signIn})(Home);