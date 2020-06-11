import React from 'react';
import {connect} from "react-redux";
import {getUser, signIn} from "../redux/actions/registration";
import HomeMenu from "../components/others/HomeMenu";
import Grid from "../components/layout/Grid";
import Row from "../components/layout/Row";
import Column from "../components/layout/Column";
import Container from "../components/layout/Container";
import HomeBackground from "../images/HomeBackground.png";

class Soon extends React.Component {

    state = {
        debug: false,
        enableInstitution: true,
        clockState: "start"
    };

    constructor(props) {
        super(props);
        this.props.getUser();
        setInterval(
            () => {
                if (this.state.clockState === "start") {
                    this.setState({clockState: "half"});
                } else if (this.state.clockState === "half") {
                    this.setState({clockState: "end"});
                } else if (this.state.clockState === "end") {
                    this.setState({clockState: "start"});
                }
            }
            , 1000);
    }

    renderClock = () => {
        if (this.state.clockState === "start") {
            return "icon hourglass start";
        }
        if (this.state.clockState === "half") {
            return "icon hourglass half";
        }
        if (this.state.clockState === "end") {
            return "icon hourglass end";
        }
    };


    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <HomeMenu/>
                <Grid style={{background: "linear-gradient(to top, #68306f 20%, #49214d 80%)"}}>
                    <Row className="row">
                        <Column size={8} style={{width: "100%", height: "100%"}}>
                            <Container>
                                <Grid>
                                    <Row/><Row/><Row/><Row/>
                                    <Row/><Row/><Row/><Row/>
                                    <Row style={{color: "#fff", fontSize: "3.5em"}}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            COMING
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{
                                        color: "#fff",
                                        fontSize: "3.5em",
                                        marginTop: "5px",
                                        marginLeft: "5%"
                                    }}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            SOON
                                        </Column>
                                        <Column size={3}/>
                                    </Row>
                                    <Row style={{
                                        color: "#fff",
                                        fontSize: "4em",
                                        marginTop: "6%",
                                        marginLeft: "12%"
                                    }}>
                                        <Column size={3}/>
                                        <Column size={8}>
                                            <i className={this.renderClock()}/>
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
    }

}

const mapStateToProps = state => {
    return {user: state.user.user};
};

export default connect(mapStateToProps, {getUser, signIn})(Soon);