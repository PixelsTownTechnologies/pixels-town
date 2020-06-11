import React from 'react';

class DropButton extends React.Component {

    state = {
        display:false,
        displayValue:"none"
    };

    handleClick = () => {

        if(!this.state.display){
            this.setState({display:true, displayValue:"block"});
        }else{
            this.setState({display:false,displayValue:"none"});
        }

    };

    render() {
        return (
            <div className="ui right dropdown inverted button item" {...this.props} onClick={this.handleClick}>
                {this.props.text}
                <i className="dropdown icon"/>
                <div className="menu" style={{display:this.state.displayValue,marginLeft:"-50%",marginTop:"5px"}} >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DropButton;