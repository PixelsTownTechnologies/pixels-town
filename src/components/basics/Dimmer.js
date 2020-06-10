import React from 'react';
import Grid from "../layout/Grid";
import Row from "../layout/Row";
import Column from "../layout/Column";

class Dimmer extends React.Component {


    state = {
        active: this.props.active,
        exitHover: false
    };

    getExitClasses = () => {
        if (this.state.exitHover) {
            return "x icon icon";
        } else {
            return "times circle icon";
        }
    };

    getActive = () => {
        if (this.state.active) {
            return "active";
        } else {
            return "disabled";
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({active: nextProps.active});
    }

    getStyle = ()=>{
        if(this.props.width !== undefined){
            return {width:this.props.width+"%",left:((100-this.props.width)/2)+"%",overflow: "scroll",maxHeight:"99%",top:"0.5%",...this.props.style};
        }else {
            return {width:"50%",left:"25%",...this.props.style,top:"2%"};
        }
    };

    //reset
    render() {
        return (
            <div className={"ui " + this.getActive() + " page dimmer"} >
                <div className="content" style={{width: "100%",height:"100%"}}>
                    <div className="ui segment" style={this.getStyle()}>
                        <div className="ui form">
                            <Grid>
                                <Row>
                                    <Column size={14}/>
                                    <Column size={2}>
                                        <div className="ui field">
                                            <label><i
                                                className={this.getExitClasses()}
                                                onMouseOver={() => {
                                                    this.setState({exitHover: true});
                                                }}
                                                onMouseLeave={() => {
                                                    this.setState({exitHover: false});
                                                }}
                                                onClick={() => {
                                                    this.setState({active: false});
                                                    this.props.reset(false);
                                                }}
                                                style={{fontSize: "1.5em", marginLeft: "50%", cursor: "pointer"}}
                                            />
                                            </label>
                                        </div>
                                    </Column>
                                </Row>
                                <Row>
                                    <Column size={1}/>
                                    <Column size={14}>
                                        {this.props.children}
                                    </Column>
                                    <Column size={1}/>
                                </Row>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dimmer;