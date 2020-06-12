import React from "react";
import {Container, Divider, Grid, Header, Icon, Image, Responsive, Segment} from 'semantic-ui-react';
import './home.css';
import '../../../resource/styles/general.css';
import {PageWrapper} from "../common/page-wrapper";
import Background from '../../../resource/images/background/1127685.png';
import {PixelsTownName} from "../../common/site/name/site-name";
import {PixelsTownLogo} from "../../common/site/logo/site-logo";
import SkillsSection from "../../common/skill/skills-section";
import {MultipleWave} from "../../common/wave/wave";
import {ClientComments, FrameworksButtons, LanguagesButtons, serviceProvides, skills} from "./static-data";
import {Link} from "react-router-dom";
import CityIcon from '../../../resource/images/pages/home/city.png';
import {IconButtonGroup} from "../../common/icon-button-group/icon-button-group";
import {NavBar} from "../../common/nav-bar/nav-bar";
import MessageIcon from '../../../resource/images/pages/home/message.png';
import ChattingBox from "../../common/chatting-box/chatting-box";
import BootIcon from "../../../resource/images/pages/home/boot.png";
import CardViewer from "../../common/cards/viewer/card-viewer";
import ClientCard from "../../common/cards/client-card/client-card";

function HomeCompanyContent() {
    return (
        <Segment className="home-background-text">
            <PixelsTownLogo size={200} background='#C3E0E5'/>
            <PixelsTownName style={{fontSize: '2.0em'}}/>
            <h3 style={{fontStyle: 'italic'}}>“Under each pixel there's story”</h3>
            <p style={{fontStyle: 'italic'}}>Join Now to get many free <br/> services and design you site by lower
                cost!</p>
            <Grid columns={2}>
                <Grid.Column columns={10}>
                    <button className="px-button">
                        Join
                    </button>
                </Grid.Column>
                <Grid.Column columns={6} className="home-have-account-style">
                    <Link to="">I have account!</Link>
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

function HomeSection1() {
    return (
        <Segment
            textAlign='center'
            style={{height: document.documentElement.clientHeight, padding: '0px', margin: '0px'}}
            vertical
            className="home-segment"
        >
            <div className="home-container home-background">
                <Responsive {...Responsive.onlyMobile}>
                    <HomeCompanyContent/>
                </Responsive>
                <Responsive {...Responsive.onlyTablet}>
                    <HomeCompanyContent/>
                </Responsive>
                <Responsive {...Responsive.onlyComputer}>
                    <Grid columns={2}>
                        <Grid.Column columns={4}>
                            <HomeCompanyContent/>
                        </Grid.Column>
                        <Grid.Column columns={12}>
                            <Segment className="home-background-image">
                                <Image src={Background}/>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Responsive>
            </div>
            <MultipleWave marginTop={0}/>
        </Segment>
    );
}

function HomeSection2() {
    return (
        <Segment
            style={{
                padding: '0px',
                margin: '0px',
                background: '#f5f5f5',
                paddingBottom: '5%',
                boxShadow: '0px 1px 20px 0px rgba(0, 0, 0, 0.13), 0 8px 25px 0 rgba(0, 0, 0, 0.09)'
            }}
            vertical
            className="home-segment"
        >
            <div className="home-container">
                <Container>
                    <Header as='h1' className="center">
                        A powerful and innovative feature set
                    </Header>
                    <Header as='h2' className="center header-gray-section">
                        There's more and more under each pixel
                    </Header>
                    <SkillsSection items={skills}/>
                    <Divider horizontal className="home-section2-divider">
                        <Header as='h1'>
                            <Image src={CityIcon} className="home-city-image"/>
                        </Header>
                    </Divider>
                    <Header as='h1' className="center home-city-image-header">
                        Service made by pixels town
                    </Header>
                    <Header as='h2' className="center header-gray-section">
                        We strive to satisfy you
                    </Header>
                    <SkillsSection items={serviceProvides}/>
                </Container>
            </div>
        </Segment>
    );
}

function HomeSection3() {
    return (
        <Segment
            textAlign='center'
            style={{paddingTop: '0px', margin: '0px', paddingBottom: '0px'}}
            vertical
            className=""
        >
            <div className="home-container home-background section3-container">
                <Header className="home-s3-header">Technologies Support</Header>
                <IconButtonGroup items={LanguagesButtons}/>
                <IconButtonGroup items={FrameworksButtons} className='framework-group-section'/>
            </div>
        </Segment>
    );
}

function HomeSection4() {
    return (
        <Segment
            textAlign='center'
            style={{paddingTop: '0px', margin: '0px', paddingBottom: '0px'}}
            vertical
            className=""
        >
            <div className="home-container section4-container">
                <Header as='h1'>
                    <Icon name='comments'/>
                    Top Client Comments
                </Header>
                <CardViewer cards={
                    ClientComments.map(card => {
                        return <ClientCard {...card}/>
                    })
                }/>
            </div>
        </Segment>
    );
}

function ChattingButton(props) {
    return (
        <div className="chatting-button" onClick={props.click}>
            <Image src={MessageIcon}/>
        </div>
    );
}

class Home extends React.Component {

    msgSendHandler = (msg) => {
        this.setState({
            messages: [...this.state.messages, msg]
        });
        if (!this.state.isMsgSend) {
            this.setState({
                chattingWriting: true,
                isMsgSend: true
            });
            const bootMsg = {
                id: 1,
                senderId: this.state.chatting.caller[0].id,
                msg: 'Thanks to call, we will be with you in a moment, Please write what you want exactly.'
            };
            setTimeout(() => {
                this.setState({
                    chattingWriting: false,
                    messages: [...this.state.messages, bootMsg],
                });
            }, 2000);
        }
    };

    state = {
        chattingBoxShow: false,
        chatting: {
            caller: [{image: BootIcon, id: 555521, name: 'PixelsTown Support'}],
            owner: {image: BootIcon, id: 1, name: 'Guest'},
            onMsgSend: (msg) => {
                this.msgSendHandler(msg)
            }
        },
        messages: [{
            id: 1,
            senderId: 555521,
            msg: 'Hello, Can i help you?'
        }],
        chattingWriting: false,
        isMsgSend: false,
        showSoon: false
    };

    render() {
        const chattingBoxConfig = {
            show: this.state.chattingBoxShow,
            className: "chatting-box",
        };
        const chattingButtonConfig = {
            click: () => {
                this.setState({chattingBoxShow: !this.state.chattingBoxShow})
            }
        };
        return (
            <PageWrapper openModel={this.state.showSoon}>
                <ChattingBox
                    {...this.state.chatting}
                    messages={this.state.messages}
                    {...chattingBoxConfig}
                    writing={this.state.chattingWriting}
                />
                <ChattingButton
                    {...chattingButtonConfig}
                />
                <HomeSection1/>
                <HomeSection2/>
                <HomeSection3/>
                <HomeSection4/>
                <NavBar/>
            </PageWrapper>
        );
    }
}

export default Home;