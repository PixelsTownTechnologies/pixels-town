import React from 'react';
import ImageURL from "../../apis/ImageURL";
import backend from "../../apis/backend";

class ReportCard extends React.Component {

    state = {
        active: false,
        reportImages: [{image: ""}, {image: ""}],
    };

    componentDidMount = async () => {
        const url = "/user/" + this.props.userId + "/fetch_report_images/" + this.props.report.id;
        const response = await backend.get(url);
        if (response.data.status_code === 200) {
            this.setState({reportImages: response.data.data.images});
        }
    };

    getDataTime = (datatime) => {
        var dateobj = new Date(datatime);
        //var time = dateobj.toTimeString();
        return dateobj.toDateString();
    };

    renderImages = () => {
        return this.state.reportImages.map((item, key) => {
                if (key === 0) {
                    return <img alt="img1"
                                src={ImageURL + item.image}
                                className="visible content"
                                style={{maxHeight: "200px"}}/>;
                }
                return <img alt="img1"
                            src={ImageURL + item.image}
                            className="hidden content"
                            style={{maxHeight: "200px"}}/>;
            }
        );
    };

    render() {
        return (
            <div className="ui segment">
                <div className="ui divided items">
                    <div className="item">
                        <div className="image">
                            <div className="ui slide masked reveal image">
                                {this.renderImages()}
                            </div>
                        </div>
                        <div className="content">
                            <div className="header">{this.props.report.title}</div>
                            <div className="description" style={{maxHeight: "120px"}}>
                                <p style={{maxHeight: "120px", overflow: "auto"}}>{this.props.report.description}</p>
                            </div>
                            <div className="extra">
                                <div className="ui right floated primary button"
                                     onClick={this.props.onClickButton}>
                                    Send Report
                                    <i className="right chevron icon"/>
                                </div>
                                <div className="ui right floated primary button"
                                     >
                                    View Report
                                    <i className="eye icon" style={{marginLeft:"10px"}}/>
                                </div>
                                <div className="ui label">
                                    <i className="id badge icon"/>
                                    {this.props.report.patient.first_name} {this.props.report.patient.last_name}
                                </div>
                                <div className="ui label">
                                    <i className="calendar icon"/>
                                    {this.getDataTime(this.props.report.create_date)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default ReportCard;