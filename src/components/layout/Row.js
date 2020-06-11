import React from 'react';

class Row extends React.Component {

    render() {
        return (
            <div className="row" {...this.props}>
                {this.props.children}
            </div>
        );
    }
}

export default Row;