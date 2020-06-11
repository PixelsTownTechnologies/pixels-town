import React from 'react';
import {Link} from "react-router-dom";

class DDLinkItem extends React.Component {

    render() {
        return (
            <Link to={this.props.to} className="item" style={{borderTop:'1px solid #888'}}>
                <h4><i className={this.props.icon+" icon"}/>{this.props.text}</h4>
            </Link>
        );
    }
}

export default DDLinkItem;