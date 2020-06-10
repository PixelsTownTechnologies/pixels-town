import React from 'react';

class LabelTeal extends React.Component {

    render() {
        return (
            <label className="ui teal ribbon label" {...this.props}>{this.props.text}</label>
        );
    }
}

export default LabelTeal;