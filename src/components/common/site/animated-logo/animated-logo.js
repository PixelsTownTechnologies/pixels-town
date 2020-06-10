import React from "react";
import './animated-logo.css';

export class AnimatedPixelsTownLogo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bigBoxSize: props.size / 2,
            smallBoxSize: props.size / 4,
            smallBoxMarginTop: props.size / 2,
            smallBoxMarginLeft: props.size / 4
        };
    }


    handelMouseEnter = (e) => {
        this.setState({
            smallBoxSize: this.state.smallBoxSize + 10,
            smallBoxMarginTop: this.state.smallBoxMarginTop + 5,
            smallBoxMarginLeft: this.state.smallBoxMarginLeft - 5
        });
    };

    handelMouseLeave = (e) => {
        this.setState({
            smallBoxSize: this.state.smallBoxSize - 10,
            smallBoxMarginTop: this.state.smallBoxMarginTop - 5,
            smallBoxMarginLeft: this.state.smallBoxMarginLeft + 5
        });
    };

    render() {
        const bigBoxSize = this.state.bigBoxSize;
        const smallBoxSize = this.state.smallBoxSize;
        const size = this.props.size;
        const background = this.props.background;
        return (
            <div style={{...this.props.style, width: size * 3 / 4, height: size * 3 / 4}}>
                <div className="logo-first-box" style={{
                    width: `${bigBoxSize}px`, height: `${bigBoxSize}px`
                }}/>
                <div className="logo-first-box" style={{
                    width: `${bigBoxSize}px`,
                    height: `${bigBoxSize}px`,
                    marginLeft: `${bigBoxSize / 2}px`,
                    marginTop: `-${bigBoxSize / 2}px`,
                }}/>
                <div className="logo-second-box" style={{
                    width: `${smallBoxSize}px`, height: `${smallBoxSize}px`,
                    outline: `${background} solid ${bigBoxSize * 0.07}px`,
                    marginTop: `-${this.state.smallBoxMarginTop}px`,
                    marginLeft: `${this.state.smallBoxMarginLeft}px`,
                }}
                     onMouseEnter={this.handelMouseEnter}
                     onMouseLeave={this.handelMouseLeave}
                />
            </div>
        );

    }
}