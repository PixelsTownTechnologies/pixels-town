import React from 'react';
import ImageURL from "../../apis/ImageURL";
import backend from "../../apis/backend";
import {PERMISSION_TYPE_PATIENT} from "../operation/values";

class HubReportCard extends React.Component {

    state = {
        active: false,
        reportImages: [{image: ""}, {image: ""}],
    };

    componentDidMount = async () => {
        const url = "/user/" + this.props.userId + "/fetch_report_images/" + this.props.report.report.id;
        const response = await backend.get(url);
        if (response.data.status_code === 200) {
            this.setState({reportImages: response.data.data.images});
        }
    };

    getDataTime = (datatime) => {
        var dateobj = new Date(datatime);
        //var time = dateobj.toTimeString();
        var date = dateobj.toDateString();
        return date;
    };

    renderImages = () => {
        return this.state.reportImages.map((item, key) => {
                if (key === 0) {
                    return <img alt="img1"
                                src={ImageURL + item.image}
                                className="visible content"
                                style={{maxHeight: "140px"}}/>;
                }
                return <img alt="img1"
                            src={ImageURL + item.image}
                            className="hidden content"
                            style={{maxHeight: "140px"}}/>;
            }
        );
    };

    renderSendButtonText = () => {
        if (this.props.sendButtonText === undefined) {
            return "Resend Report";
        } else {
            return this.props.sendButtonText;
        }
    };


    renderSenderName = () => {
        if (this.props.report.report.lab === null) {
            return (
                <div className="ui teal image label">
                    <i className="user md icon"/>
                    {this.props.report.sender.first_name} {this.props.report.sender.last_name}
                </div>
            );
        }
        if (this.props.report.report.lab.manager.id === this.props.report.sender.id) {
            return (
                <div className="ui teal image label">
                    <img alt="lab logo" src={ImageURL + this.props.report.report.lab.logo}/>
                    {this.props.report.report.lab.name}
                </div>
            );
        } else if (this.props.report.sender.type.type === PERMISSION_TYPE_PATIENT) {
            return (
                <div className="ui teal image label">
                    <i className="id badge icon"/>
                    {this.props.report.sender.first_name} {this.props.report.sender.last_name}
                </div>
            );
        }
        return (
            <div className="ui teal image label">
                <i className="user md icon"/>
                {this.props.report.sender.first_name} {this.props.report.sender.last_name}
            </div>
        );
    };


    render() {
        return (
            <div className="ui segment" style={{backgroundColor: "#fbfbfb"}}>
                <div className="ui divided items">
                    <div className="item">
                        <div className="image">
                            <div className="ui slide masked reveal image">
                                {this.renderImages()}
                            </div>
                        </div>
                        <div className="content">
                            <div className="header">{this.props.report.title}</div>
                            <div className="description">
                                <p>{this.props.report.msg}</p>
                            </div>
                            <div className="extra">
                                <div className="ui right floated primary button"
                                     onClick={this.props.sendButton}>
                                    <i className="paper plane icon"/>
                                    {this.renderSendButtonText()}
                                </div>
                                <div className="ui right floated primary button"
                                     onClick={() => {
                                         this.props.viewButton(this.state.reportImages)
                                     }}>
                                    <i className="eye icon"/>
                                    View Report
                                </div>
                                {this.renderSenderName()}
                                <div className="ui basic image label">
                                    <i className="calendar icon"/>
                                    {this.getDataTime(this.props.report.report.create_date)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default HubReportCard;