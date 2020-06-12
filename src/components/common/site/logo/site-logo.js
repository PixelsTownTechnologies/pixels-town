import React from "react";
import './site-logo.css';

export function PixelsTownLogo(props) {
    const size = props.size;
    const background = props.background;
    const fBoxSize = size / 2;
    return (
        <div style={{...props.style, width: size * 3 /4, height: size * 3 /4}}>
            <div className="logo-first-box" style={{
                width: `${fBoxSize}px`, height: `${fBoxSize}px`
            }}/>
            <div className="logo-first-box" style={{
                width: `${fBoxSize}px`,
                height: `${fBoxSize}px`,
                marginLeft: `${fBoxSize / 2}px`,
                marginTop: `-${fBoxSize / 2}px`,
            }}/>
            <div className="logo-second-box" style={{
                width: `${fBoxSize /2}px`, height: `${fBoxSize /2}px`,
                outline:`${background} solid ${fBoxSize * 0.07}px`,
                marginTop: `-${fBoxSize}px`,
                marginLeft: `${(fBoxSize  / 2)}px`,
            }}/>
        </div>
    );
}