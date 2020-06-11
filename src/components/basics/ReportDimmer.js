import React from 'react';
import Field from "./Field";
import MultiImageViewer from "./MultiImageViewer";
import Dimmer from "./Dimmer";
import ImageURL from "../../apis/ImageURL";
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import Column from "../layout/Column";
import Padding from "./Padding";
import DefaultUserImage from "../../images/default-user.png";

class ReportDimmer extends React.Component {


    state = {
        active: this.props.active,
        exitHover: false
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({active: nextProps.active});
    }

    renderReportCreator = () => {
        if (this.props.report.lab !== undefined && this.props.report.lab !== null) {
            return (
                <h2 className="ui header">
                    <img className="ui middle circular massive image" alt="aaa"
                         src={ImageURL + this.props.report.lab.logo}/>
                    <div className="content" style={{color: "black", fontSize: "1.0em"}}>
                        {this.props.report.lab.name}
                        <div
                            className="sub header">{this.getDataTime(this.props.report.create_date)}</div>
                    </div>
                </h2>
            );
        } else {
            if (this.props.report.doctor.photo === undefined) {
                return (
                    <h2 className="ui header">
                        <img className="ui middle circular massive image" alt="aaa"
                             src={DefaultUserImage}
                             style={{maxHeight: "60px"}}
                        />
                        <div className="content" style={{color: "black", fontSize: "1.0em"}}>
                            Dr.{this.props.report.doctor.first_name} {this.props.report.doctor.last_name}
                            <div className="sub header">{this.getDataTime(this.props.report.create_date)}</div>
                        </div>
                    </h2>
                );
            }
            return (
                <h2 className="ui header">
                    <img className="ui middle circular massive image" alt="aaa"
                         src={ImageURL + this.props.report.doctor.photo}
                         style={{maxHeight: "60px"}}
                    />
                    <div className="content" style={{color: "black", fontSize: "1.0em"}}>
                        Dr.{this.props.report.doctor.first_name} {this.props.report.doctor.last_name}
                        <div className="sub header">{this.getDataTime(this.props.report.create_date)}</div>
                    </div>
                </h2>
            );
        }
    };

    /*
    <div className="ui field" style={{textAlign: "left", fontSize: "1.4em"}}>
        <label><h2><i className="clipboard icon"/>Report</h2></label>
    </div>
    */

    renderPatientData = () => {
        return (
            <Field>
                <label>
                    <Grid>
                        <Row>
                            <Column size={4}>
                                <Row>
                                    <label className="ui image left attached label">
                                        <i className="user circle icon"/>
                                        Name:&nbsp;&nbsp;
                                        {this.props.report.patient.first_name}&nbsp;
                                        {this.props.report.patient.second_name}&nbsp;
                                        {this.props.report.patient.last_name}
                                    </label>
                                </Row>
                                <Padding repeat={1}/>
                                <Row>
                                    <label className="ui image left attached label" style={{marginTop: "40px"}}>
                                        <i className="calendar icon"/>
                                        Birth Date:&nbsp;&nbsp;
                                        {this.getDataTime(this.props.report.patient.birth_date)}
                                    </label>
                                </Row>
                            </Column>
                            <Column size={4}>
                                <label className="ui image left attached label">
                                    <i className="mobile icon"/>
                                    Phone number:&nbsp;&nbsp;
                                    {this.props.report.patient.phone_number}
                                </label>
                                <Padding repeat={3}/>
                                <label className="ui image left attached label" style={{marginTop: "40px"}}>
                                    <i className="venus mars icon"/>
                                    Gender:&nbsp;&nbsp;
                                    {this.renderGender()}
                                </label>
                            </Column>
                            <Column size={8}>
                                <label className="ui image left attached label">
                                    <i className="id card icon"/>
                                    TL ID:&nbsp;&nbsp;
                                    {this.props.report.patient.code}
                                </label>
                            </Column>
                        </Row>
                    </Grid>
                </label>
            </Field>
        );
    };

    render() {
        if (this.props.report === undefined) {
            return <div/>;
        }
        console.log(this.props.report.description);
        return (
            <Dimmer active={this.props.active} reset={this.props.reset} width={80} style={{backgroundColor: "#fafafa"}}>
                {this.renderReportCreator()}
                <div className="ui top left attached teal label">
                    {this.props.report.serial_numbers}
                </div>
                <h4 className="ui horizontal divider header">
                    <i className="id badge icon"/>
                    Patient
                </h4>
                {this.renderPatientData()}
                <Padding repeat={2}/>
                <h4 className="ui horizontal divider header">
                    <i className="images icon"/>
                    Images
                </h4>
                <Field>
                    <MultiImageViewer images={this.props.images}/>
                </Field>
                <Padding repeat={2}/>
                <h4 className="ui horizontal divider header">
                    <i className="heartbeat icon"/>
                    Decision
                </h4>

                <Field>
                    <h3 className="ui header">
                        <i className="clipboard outline icon"/>
                        <div className="content">
                            Description
                        </div>
                    </h3>
                </Field>
                <Field>
                    <textarea
                        className="ui small message"
                        contentEditable={true}
                        rows={5}
                        style={{
                            color: "black",
                            textAlign: "left",
                            float: "left",
                            maxWidth: "100%",
                            maxHeight: "150px",
                            backgroundImage:
                                " -webkit-linear-gradient(left, white 10px, transparent 10px)," +
                                " -webkit-linear-gradient(right, white 10px, transparent 10px)," +
                                " -webkit-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white 31px)"
                            ,
                            backgroundSize: " 100% 100%, 100% 100%, 100% 31px",
                            border: "none",
                            lineHeight: "31px",
                            padding: "8px",
                            resize: "none",
                        }}
                        value={this.props.report.title}
                    />
                </Field>
                <Field>
                    <Padding repeat={2}/>
                </Field>
                <Field>
                    <textarea
                        className="ui small message"
                        contentEditable={true}
                        rows={30}
                        style={{
                            color: "black",
                            textAlign: "left",
                            float: "left",
                            maxWidth: "100%",
                            maxHeight: "700px",
                            backgroundImage:
                                " -webkit-linear-gradient(left, white 10px, transparent 10px)," +
                                " -webkit-linear-gradient(right, white 10px, transparent 10px)," +
                                " -webkit-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white 31px)"
                            ,
                            backgroundSize: " 100% 100%, 100% 100%, 100% 31px",
                            border: "none",
                            lineHeight: "31px",
                            padding: "8px",
                            resize: "none",
                        }}
                        value={this.props.report.description}
                    />
                </Field>
                <Field>
                    <Padding repeat={3}/>
                </Field>

            </Dimmer>
        );
    }

    renderGender = () => {
        if (this.props.report.patient.gender === 'f') {
            return "Female";
        } else {
            return "Male";
        }
    };

    getDataTime = (datatime) => {
        var dateobj = new Date(datatime);
        //var time = dateobj.toTimeString();
        var date = dateobj.toDateString();
        return date;
    };

}

export default ReportDimmer;