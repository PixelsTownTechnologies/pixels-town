import React from "react";
import {MenuItem} from "semantic-ui-react";
import './site-name.css';

export function PixelsTownMenuItemName(props) {
    return (
        <MenuItem className="px-menu-name-style" {...props}>
            <h2>
                <span className="pixels-style">Pixels</span>
                <span className="town-style">Town</span>
            </h2>
        </MenuItem>
    );
}

export function PixelsTownName(props) {
    return (
        <div className="px-menu-name-style">
            <h2 {...props}>
                <span className="pixels-style">Pixels</span>
                <span className="town-style">Town</span>
            </h2>
        </div>
    );
}