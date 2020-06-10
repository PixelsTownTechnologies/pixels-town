import React from 'react';
import Padding from "./Padding";

class UpDownSegment extends React.Component {

    state = {
        isView: true,
    };

    renderUpDownIcon = () => {
        if (!this.state.isView) {
            return "angle down icon";
        } else {
            return "angle up icon";
        }
    };

    renderContent = () => {
        if (this.state.isView) {
            return (
                <div>
                    <Padding small={true}/>
                    <div className="ui fitted divider"/>
                    <Padding repeat={1}/>
                    <div className="ui form">
                        {this.props.children}
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className="ui segment">
                <div className="item">
                    <div className="content">
                        <div className="ui large header">{this.props.title}
                            <div className="ui top right attached label"
                                 style={{background: "#00000000", fontSize: "1.2em", cursor: "pointer"}}>
                                <i className={this.renderUpDownIcon()} onClick={
                                    () => {
                                        this.setState({isView: !this.state.isView});
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderContent()}
            </div>
        );
    }
}

export default UpDownSegment;