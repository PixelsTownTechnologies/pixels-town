import React from 'react';
import {Link} from "react-router-dom";
import user from '../../../images/default-user.png';
import ImageURL from "../../../apis/ImageURL";
class IDDImageItem extends React.Component {

    render() {
        return (
            <Link to={this.props.to}>
                <object
                    className="ui circular image"
                    data={ImageURL + this.props.institution.logo}
                    type="image/png"  style={{marginLeft: "40%", marginTop: "10%", width: "60px", height: "60px"}}>
                    <img className="ui circular image"
                         src={user}
                         alt="user"
                    />
                </object>
                <h2 style={{
                    color: "black",
                    textAlign: "center",
                    marginTop: "10%",
                    fontSize: "1.0em",
                    fontFamily: '"Trebuchet MS", Helvetica, sans-serif'
                }}>
                    {this.props.institution.name}
                </h2>
                <h4 style={{
                    textAlign: "center",
                    marginTop: "5%",
                    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
                    color: "gray",
                    marginBottom: "5%",
                }}>
                    {this.props.institution.email}
                </h4>
            </Link>
        );
    }
}

export default IDDImageItem;