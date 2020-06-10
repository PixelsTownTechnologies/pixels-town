import React from 'react';
import ImageURL from "../../apis/ImageURL";

class HospitalCard extends React.Component {

    state = {
        active: false,
    };

    renderState = () => {
        if (!this.props.join_institution.is_accepted) {
            return (
                <div className="ui label">
                    <i className="sync icon"/>
                    Waiting ...
                    </div>
            );
        }else {
            return (
                <div className="ui label">
                    <i className="check icon" style={{color:"green"}}/>
                    Accepted
                </div>
            );
        }
    };

    render() {
        if (this.props.isCancel) {
            return (
                <div className="ui segment">
                    <div className="ui divided items">
                        <div className="item">
                            <div className="image">
                                <img
                                    src={ImageURL + this.props.join_institution.hospital.logo}
                                    alt="user"
                                    style={{maxHeight: "200px"}}
                                />
                            </div>
                            <div className="content">
                                <div className="header">{this.props.join_institution.hospital.name}</div>
                                <div className="meta">
                                <span className="cinema"><i
                                    className="globe icon"/> {this.props.join_institution.hospital.website}</span>
                                </div>
                                <div className="description">
                                    <p>{this.props.join_institution.hospital.description}</p>
                                </div>
                                <div className="extra">
                                    <div className="ui right floated primary button"
                                         onClick={this.props.onClickButton}>
                                        Cancel Request
                                        <i className="right chevron icon"/>
                                    </div>
                                    {this.renderState()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="ui segment">
                <div className="ui divided items">
                    <div className="item">
                        <div className="image">
                            <img
                                src={ImageURL + this.props.hospital.logo}
                                alt="user"
                                style={{maxHeight: "200px"}}
                            />
                        </div>
                        <div className="content">
                            <div className="header">{this.props.hospital.name}</div>
                            <div className="meta">
                                <span className="cinema"><i
                                    className="globe icon"/> {this.props.hospital.website}</span>
                            </div>
                            <div className="description">
                                <p>{this.props.hospital.description}</p>
                            </div>
                            <div className="extra">
                                <div className="ui right floated primary button"
                                     onClick={this.props.onClickButton}>
                                    Send Join Request
                                    <i className="right chevron icon"/>
                                </div>
                                <div className="ui label">
                                    <i className="map marker alternate icon"/>
                                    {this.props.hospital.country}-{this.props.hospital.city}-{this.props.hospital.street}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default HospitalCard;