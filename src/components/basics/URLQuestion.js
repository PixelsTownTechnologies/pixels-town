import React from 'react';
import {Link} from "react-router-dom";

class URLQuestion extends React.Component {

    render() {
        return (
            <div style={{width: '40%', marginLeft: '30%'}}>
                <br/>
                {this.props.question}
                <br/>
                <div style={{width: '70%', marginLeft: '15%'}}>
                    <Link to={this.props.to}> {this.props.linkText}</Link>
                </div>
            </div>
        );
    }
}

export default URLQuestion;