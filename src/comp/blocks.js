import React from 'react';
import {BaseBlock} from "./base";
import DefaultImage from './assets/default.jpg';
import './styles.css';

export const SegmentThemes = {
    basic: "ui segment",
    loading: "ui loading segment",
    secondary: "ui secondary segment",
};
export const MessageThemes = {
    warning: {theme: "ui warning message"},
    success: {theme: "ui success message"},
    error: {theme: "ui negative message"},
    basic: {theme: "ui message"}
};
export const ImageThemes = {
    basic: "image",
    circular: "circular image",
    rounded: "rounded image",
    fluid: "fluid image",
};

export class Segment extends BaseBlock {

    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme ? this.props.theme : SegmentThemes.basic,
        }
    }

    render() {
        return (
            <div
                style={this.props.style}
                className={this.props.loading ? SegmentThemes.loading : this.state.theme}
            >
                {this.props.children}
            </div>
        );
    }
}

/**
 *  type={string}
 *  header={string}
 *  msg={string}
 *  closeable={boolean}
 *  timer={boolean}
 *  time={sec}
 *  close={function}
 **/
export class Mag extends BaseBlock {
    static WARNING = "warning";
    static SUCCESS = "success";
    static ERROR = "error";

    timeoutID;

    constructor(props) {
        super(props);
        if (this.props.timer) {
            this.timeoutID = setTimeout(this.closeAction, this.props.time * 1000);
        }
    }

    loadTheme() {
        const type = this.props.type;
        if (type) {
            if (type === Mag.WARNING) {
                return MessageThemes.warning;
            }
            if (type === Mag.SUCCESS) {
                return MessageThemes.success;
            }
            if (type === Mag.ERROR) {
                return MessageThemes.error;
            }
            return MessageThemes.basic;
        } else {
            return MessageThemes.basic;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.if && this.props.timer) {
            if (this.timeoutID !== undefined) {
                clearTimeout(this.timeoutID);
                this.timeoutID = undefined;
            }
            this.timeoutID = setTimeout(this.closeAction, this.props.time * 1000);
        }
    }

    closeAction = () => {
        if (this.timeoutID !== undefined) {
            clearTimeout(this.timeoutID);
            this.timeoutID = undefined;
        }
        if (this.props.close)
            this.props.close();
    };

    showCloseButton = () => {
        return this.props.closeable ? <i className="close icon" onClick={this.closeAction}/> : null;
    };

    show(theme) {
        return (
            <div className={theme.theme}>
                {this.showCloseButton()}
                <div className="header">
                    {this.props.header ? this.props.header : ""}
                </div>
                {this.props.msg ? this.props.msg : ""}
            </div>
        );
    }

}

export class Image extends BaseBlock {
    //default, type, size
    static base = "";
    static sizeValue = {
        1: {name: "mini", size: "35px"},
        2: {name: "tiny", size: "80px"},
        3: {name: "small", size: "150px"},
        4: {name: "medium", size: "300px"},
        5: {name: "large", size: "450px"},
        6: {name: "big", size: "600px"},
        7: {name: "huge", size: "800px"},
        8: {name: "massive", size: "960px"},
    };
    static BASIC = "basic";
    static CIRCULAR = "circular";
    static ROUNDED = "rounded";
    static FLUID = "fluid";

    state = {
        error: false
    };

    loadTheme() {
        if (this.props.size) {
            const size = Image.sizeValue[this.props.size < 8 ? this.props.size : 8].name;
            return "ui " + size + " " + (this.props.type ? ImageThemes[this.props.type] : ImageThemes.basic);
        } else {
            return "ui " + (this.props.type ? ImageThemes[this.props.type] : ImageThemes.basic);
        }
    }

    loadSrc = () => {
        if (this.state.error) {
            return this.props.default ? this.props.default : DefaultImage;
        } else {
            return this.props.url ? (this.props.base ? Image.base + this.props.url : this.props.url) : "";
        }
    };


    show(theme) {
        return (
            <img
                className={theme}
                onError={() => {
                    this.setState({error: true})
                }}
                src={this.loadSrc()}
                alt=""/>
        );
    }

}

export class Dialog extends BaseBlock {

    state = {
        lastStateIsActive :false,
        lastBodyState: {}
    };

    loadTheme() {
        if(this.state.lastStateIsActive) {
            if(this.props.open){
                return {theme : "ui active page dimmer"};
            }else{
                document.getElementsByTagName('body')[0].style.margin = this.state.lastBodyState.margin;
                document.getElementsByTagName('body')[0].style.height =  this.state.lastBodyState.height;
                document.getElementsByTagName('body')[0].style.overflow=  this.state.lastBodyState.overflow;
                this.setState({lastBodyState:{},lastStateIsActive:false});
                return {theme: "ui page dimmer"};
            }
        }else {
            if(this.props.open){
                const lastBodyState = {};
                lastBodyState.margin = document.getElementsByTagName('body')[0].style.margin;
                lastBodyState.height = document.getElementsByTagName('body')[0].style.height;
                lastBodyState.overflow = document.getElementsByTagName('body')[0].style.overflow;
                document.getElementsByTagName('body')[0].style.margin = '0px';
                document.getElementsByTagName('body')[0].style.height = '100%';
                document.getElementsByTagName('body')[0].style.overflow= 'hidden';
                this.setState({lastBodyState,lastStateIsActive:true});
                return {theme : "ui active page dimmer"};
            }else{
                return {theme: "ui page dimmer"};
            }
        }
    }

    show(theme) {
        return (
            <div className={theme.theme}>
                <div className="content" style={{width: "100%", height: "100%"}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}