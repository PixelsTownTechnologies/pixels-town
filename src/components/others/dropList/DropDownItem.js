import React from 'react';

class DropDownItem extends React.Component {

    state = {
        hidden: false,
        style: {},
    };

    handlerOnClick = () => {
        if (this.state.hidden) {
            this.setState({style: {display: "block", boxShadow: '0 5px 5px 0px rgba(0, 0, 0, 0.3)'}, hidden: false});
        } else {
            this.setState({style: {}, hidden: true});
        }
    };


    render() {
        return (
            <div className="ui dropdown item" onClick={this.handlerOnClick}
                 style={{padding: "5px", marginRight: '10px'}}>
                <object
                    className="ui circular image"
                    data={this.props.src}
                    type="image/png" style={{width: "40px", height: "40px"}}>
                    <img className="ui circular image"
                         src={this.props.src}
                         alt="user"
                    />
                </object>
                <div className="menu" style={this.state.style}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DropDownItem;