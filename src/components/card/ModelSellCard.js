import React from 'react';
import Button from "../basics/Button";
import ImageURL from "../../apis/ImageURL";

class ModelSellCard extends React.Component {

    state = {
        dimmerVisible: false,
    };


    renderDimmer = () => {
        if (this.state.dimmerVisible) {
            return "ui dimmer visible active";
        } else {
            return "ui dimmer";
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
                        <div className={this.renderDimmer()}>
                            <div className="content">
                                <div className="center">
                                    <div className="ui inverted button" onClick={this.props.viewButtonAction}>View
                                        model
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img alt="aaa" style={{maxHeight: "160px"}}
                             src={ImageURL + this.props.model.logo}/>
                    </div>
                    <div className="content">
                        <div className="header"> {this.props.model.name}</div>
                        <div className="meta">
                            <div> {this.props.model.company.name}</div>
                        </div>

                        <div className="description" style={{width: "100%",lineHeight:"16px",maxHeight:"80px",overflow:"hidden"}}>
                            {this.props.model.description}
                        </div>
                    </div>
                    <div className="extra content">
                    <span className="right floated">
                        <Button text="Buy" style={{width: "100%",webkitLineClamp:"5",}} onClick={this.props.buyButtonAction}/>
                    </span>
                        <span style={{fontSize: "1.4em"}}>
                        <i className="dollar sign icon"/>
                            {this.props.model.request_cost} <span
                            style={{fontSize: "0.5em"}}>(50 = {50 * this.props.model.request_cost}$)</span>
                        <div className="meta" style={{marginLeft: "5px", fontSize: "0.5em"}}>
                            <div>{this.props.model.free_request} Request free</div>
                        </div>
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModelSellCard;