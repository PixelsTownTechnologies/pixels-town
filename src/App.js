import React from 'react';
import {
    Dropdown,
    EmailInput,
    NumberInput,
    PasswordInput,
    SearchInput,
    StringInput,
    TextInput,
    ToggleButton,
    ToggleCheckBox
} from "./comp/basic";
import {EmptyValidator, StringValidator} from "./comp/validators";
import {Dialog, Image, Mag, Segment} from "./comp/blocks";
import {Container} from "./comp/layout";
/*
import Authenticate from "./components/operation/Authenticate";
import {BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/account/Account";
import CreateHospital from "./pages/CreateHospital";
import CreateLab from "./pages/CreateLab";
import CreateSoftwareCompany from "./pages/CreateSoftwareCompany";
import JoinHospital from "./pages/JoinHospital";
import LabCreateReport from "./pages/lab/LabCreateReport";
import LabReports from "./pages/lab/LabReports";
import ViewReports from "./pages/patient/ViewReports";
import DoctorReportReceived from "./pages/doctor/DoctorReportReceived";
import DoctorCreateReport from "./pages/doctor/DoctorCreateReport";
import DoctorReportHistory from "./pages/doctor/DoctorReportHistory";
import AddModel from "./pages/developer/AddModel";
import UserModels from "./pages/UserModels";
import ModelStore from "./pages/ModelStore";
import SendModelRequest from "./pages/SendModelRequest";
import Soon from "./pages/Soon";
import Route from "react-router-dom/es/Route";
import backend from "./apis/backend";
class App extends React.Component {

    state = {
        width: window.innerWidth,
    };

    componentDidMount = async () => {
        window.addEventListener("resize", this.resize.bind(this));
        var url = "register/guest/";
        backend.post(url);
        this.resize();
    };

    resize() {
        this.setState({width: window.innerWidth});
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Authenticate debug={true}/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route path="/account" exact component={Account}/>

                    <Route path="/create-hospital" exact component={CreateHospital}/>
                    <Route path="/create-lab" exact component={CreateLab}/>
                    <Route path="/create-software-company" exact component={CreateSoftwareCompany}/>
                    <Route path="/join-hospital" exact component={JoinHospital}/>

                    <Route path="/lab/create-report" exact component={LabCreateReport}/>
                    <Route path="/lab/view-reports" exact component={LabReports}/>

                    <Route path="/patient/reports" exact component={ViewReports}/>

                    <Route path="/doctor/reports-received" exact component={DoctorReportReceived}/>
                    <Route path="/doctor/create-report" exact component={DoctorCreateReport}/>
                    <Route path="/doctor/reports-history" exact component={DoctorReportHistory}/>
                    <Route path="/developer/add-model" exact component={AddModel}/>
                    <Route path="/user_model" exact component={UserModels}/>
                    <Route path="/model-store" exact component={ModelStore}/>
                    <Route path="/model-request" exact component={SendModelRequest}/>

                    <Route path="/developer/company_model" exact component={Soon}/>

                </BrowserRouter>
            </div>
        );
    }
}
*/

/*
<div className="ui container">
                <Grid>
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment">
                                Computer
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment">
                                Computer
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment">
                                Computer
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment">
                                Computer
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment">
                                Computer
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment">
                                Computer
                            </div>
                        </div>
                    </div>
                </Grid>
                <MobileGrid>
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment">
                                Mobile
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment">
                                Mobile
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment">
                                Mobile
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment">
                                Mobile
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="eight wide column">
                            <div className="ui segment">
                                Mobile
                            </div>
                        </div>
                        <div className="eight wide column">
                            <div className="ui segment">
                                Mobile
                            </div>
                        </div>
                    </div>
                </MobileGrid>
                {window.screen.width} - {window.screen.height}
            </div>

 */

class App extends React.Component {

    state = {
        value: "",
        validator: undefined,
        stringValue: "empty",
        msgOpen: true,
        dialogOpen: false,
        toggleCheckBox: true,
    };

    constructor(props) {
        super(props);
        //  setInterval(()=>{
        //      this.setState({dialogOpen:!this.state.dialogOpen});
        //  }, 3000);

    }

    render() {
        return (<div>
                <SearchInput
                    value={this.state.value}
                    change={(value, validator) => {
                        this.setState({value, validator})
                    }}
                    validators={[StringValidator, EmptyValidator]}
                >
                </SearchInput>
                <ToggleCheckBox
                    active={this.state.toggleCheckBox}
                    text="Click Me"
                    change={value => {
                        this.setState({toggleCheckBox: !value});
                        console.log("ToggleCheckBox", !value);
                    }}
                />
                <SearchInput
                    if={true}
                    loading={true}
                    required
                    disable
                    validators={[StringValidator, EmptyValidator]}
                >
                </SearchInput>
                <NumberInput step={0.002} min={-10} max={50} validators={[StringValidator, EmptyValidator]}/>
                <NumberInput step={500} value={10.5} numberOfDigits={5}/>
                <NumberInput step={509} min={-100} max={50000} value={-900000}/>
                <StringInput value={this.state.stringValue} change={(value) => {
                    this.setState({stringValue: value})
                }}/>
                <TextInput validators={[StringValidator, EmptyValidator]} change={(value, validation) => {
                    console.log(validation);
                }}/>
                <ToggleButton text='Select' change={(value) => {
                    console.log(value);
                }}/>

                <Dropdown name="Gender" dataList={[{id: 10, value: "Male"}, {id: 56, value: "Female"}]}
                          change={(value) => {
                              console.log(value)
                          }}/>
                <Container>
                    <Segment loading={false}>
                        <PasswordInput/>
                        <EmailInput change={(value) => {
                            if (value === "on") this.setState({msgOpen: true})
                        }}/>
                        <Mag if={this.state.msgOpen} close={() => this.setState({msgOpen: false})} type={Mag.WARNING}
                             header="This is msg" msg="This is message" closeable timer time={5}/>
                        <Mag if={true} type={Mag.SUCCESS}
                             header="This is msg" msg="This is message"/>
                        <Mag if={true} type={Mag.ERROR}
                             header="This is msg" msg="This is message"/>
                        <Container>
                            <Segment>
                                <Image size={2} url="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>
                                <Image size={3} url="fff" default="https://i.stack.imgur.com/l60Hf.png"/>
                                <Image size={4} url="fff"/>
                            </Segment>
                            <Segment>
                                <Image url="" size={1}/>
                                <Image url="" size={2}/>
                                <Image url="" size={4}/>
                                <Image url="" size={5}/>
                                <Image url="" size={9}/>
                                <Image url=""/>
                            </Segment>
                            <Segment loading={true}>
                                <Image type={Image.CIRCULAR} size={2}
                                       url="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>
                                <Image type={Image.ROUNDED} size={2}
                                       url="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>
                                <Image type={Image.BASIC} size={3} url="fff"
                                       default="https://i.stack.imgur.com/l60Hf.png"/>
                                <Image type={Image.ROUNDED} size={4} url="fff"/>
                                <Image type={Image.FLUID} size={4} url="fff"/>
                            </Segment>
                        </Container>

                    </Segment>
                </Container>
                Value:{this.state.stringValue}
                <Dialog open={this.state.dialogOpen}>
                    <Segment style={{margin: '50px', height: '500px', overflow: 'hidden'}}>
                        <Image url="" size={1}/>
                        <Image url="" size={2}/>
                        <Image url=""/>
                    </Segment>
                </Dialog>
            </div>
        );
    }
}

/*
<!--
    <Segment>
        <Image size={2} url="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"/>
        <Image size={2} url="fff" default="https://i.stack.imgur.com/l60Hf.png"/>
        <Image size={2} url="fff"/>
    </Segment>
-->
 */
export default App;
