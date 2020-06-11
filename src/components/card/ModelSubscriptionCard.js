import React from 'react';
import Button from "../basics/Button";
import ImageURL from "../../apis/ImageURL";
import {Link} from "react-router-dom";

class ModelSubscriptionCard extends React.Component {


    renderHospital = () => {
        if (this.props.hospital) {
            return (
                <div className="ui bottom right attached label"
                     style={{
                         background: "#ffffff00",
                         color: "red",
                         fontSize: "1.8em",
                         width: "55px",
                         height: "55px"
                     }}
                ><i className="h square icon"/></div>
            );
        }
    };

    renderButton = () => {
        if (this.props.subscription.number_of_request === this.props.subscription.request_used) {
            if (this.props.hospital === undefined) {
                return (
                    <Link to="/model-store" className="ui teal button"
                          style={{width: "100%", webkitLineClamp: "5",}}>
                        Buy more !
                    </Link>
                );
            } else {
                return (
                    <Button text="Requests out !" style={{width: "100%", webkitLineClamp: "5",}} disabled={true}/>
                );
            }
        } else if (this.props.hospital === undefined) {
            return (
                <Button text="Send Request" style={{width: "100%", webkitLineClamp: "5",}}
                        onClick={this.props.openButtonAciton}/>
            );
        } else {
            return (
                <Button text="Send Request" style={{width: "100%", webkitLineClamp: "5",}}
                        onClick={this.props.openButtonAciton}/>
            );
        }
    };

    render() {
        return (
            <div className="ui cards" style={{minHeight: "340px"}}>
                <div className="card" style={{minHeight: "340px"}}>
                    <div
                        className="blurring dimmable image"
                        onMouseOver={() => {
                            this.setState({dimmerVisible: true})
                        }}
                        onMouseLeave={() => {
                            this.setState({dimmerVisible: false})
                        }}
                    >
                        <img alt="aaa" style={{maxHeight: "160px"}}
                             src={ImageURL + this.props.subscription.model.logo}/>
                        {this.renderHospital()}
                    </div>
                    <div className="content">
                        <div className="header"> {this.props.subscription.model.name}</div>

                        <div className="description"
                             style={{width: "100%", lineHeight: "16px", maxHeight: "80px", overflow: "hidden"}}>
                            <b style={{fontSize: "0.9em", color: "#222222"}}>Requests Available</b>
                            <div style={{marginTop: "15px", fontSize: "1.5"}}>
                                <span style={{fontSize: "2.0em", color: "#222222"}}>
                                    {this.props.subscription.number_of_request}/
                                </span>
                                {this.props.subscription.request_used}
                            </div>
                        </div>
                    </div>
                    <div className="extra content">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        );
    }

}

export default ModelSubscriptionCard;