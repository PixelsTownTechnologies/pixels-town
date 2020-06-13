import React from "react";
import './soon.css';

class SoonModel extends React.Component {

    isOpen = false;
    stopHandleTime = false;

    render() {
        if (this.props.open && !this.isOpen) {
            this.isOpen = true;
            setTimeout(() => {
                if (!this.stopHandleTime) {
                    this.props.change(false);
                    this.isOpen = false;
                }
            }, 2500);
            this.props.change(true);
        }
        if (this.props.open) {
            return (
                <div className="ui message soon-msg-box">
                    <i aria-hidden="true" className="close icon" onClick={() => {
                        this.stopHandleTime = true;
                        this.props.change(false);
                    }}/>
                    <div className="content">
                        <div className="header">Not Available</div>
                        <p>Sorry this content not available now.</p>
                    </div>
                </div>
            );
        }
        return null;

    }
}

export default SoonModel;