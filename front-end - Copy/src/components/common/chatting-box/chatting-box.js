import React from "react";
import './chatting-box.css';
import {Image} from 'semantic-ui-react';


class ChattingBox extends React.Component {
    messageBox;

    state = {
        caller: this.props.caller,
        owner: this.props.owner,
        messageBoxValue: ''
    };

    renderMessages() {
        if (!this.props.messages) {
            return null;
        }
        const ownerId = this.state.owner.id;
        return [this.props.messages.map((msg, key) => {
            return (
                <div ref={(el) => {
                    this.messageBox = el;
                }} className={`msg-box ${ownerId === msg.senderId ? 'msg-sender' : 'msg-receiver'}`}
                     key={key}>{msg.msg}</div>
            );
        }),
            this.props.writing ?
                <div ref={(el) => {
                    this.messageBox = el;
                }} className={`msg-box msg-receiver`}
                     key={5555555694646545}>writing ...</div> : null
        ];
    }

    sendMessage = () => {
        if (this.state.messageBoxValue) {
            const msg = {
                senderId: this.state.owner.id,
                msg: this.state.messageBoxValue
            };
            this.setState({messageBoxValue: ''});
            if (this.props.onMsgSend) {
                this.props.onMsgSend(msg);
            }
        }
    };

    scrollToBottom = () => {
        if (this.messageBox) {
            this.messageBox.scrollIntoView({behavior: "smooth"});
        }
    };

    componentDidMount = () => {
        this.scrollToBottom();
    };

    componentDidUpdate = () => {
        this.scrollToBottom();
    };

    renderHeaderContent = () => {
        const callerData = this.state.caller[0];
        return (
            <div className="ui icon input chatting-box-header">
                <Image src={callerData.image}/>
                <span>{callerData.name}</span>
            </div>
        );
    };

    validData = () => {
        return this.state.caller && this.state.caller > 0 && this.state.owner && this.state.owner;
    };

    render() {
        if (!this.props.show || this.validData()) {
            return null;
        }
        return (
            <div
                className={this.props.className ? this.props.className : 'chatting-box'}
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    background: 'red',
                    position: 'fixed',
                    zIndex: 20000,
                    left: this.props.left,
                    top: this.props.top
                }}>
                {this.renderHeaderContent()}
                <div className="msg-container">
                    {this.renderMessages()}
                </div>
                <div className="input-container">
                    <div className="ui icon input">
                        <input
                            value={this.state.messageBoxValue}
                            onChange={(e) => {
                                this.setState({messageBoxValue: e.target.value})
                            }}
                            onKeyPress={(e) => {
                                if (e.charCode === 13) this.sendMessage();
                            }}
                            type="text"/>
                        <i aria-hidden="true" onClick={this.sendMessage} className="send circular inverted link icon"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default ChattingBox;