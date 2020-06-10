import {LOGIN_BACKGROUND, LOGIN_FROM} from "../../values/Colors";

export const BOX_SHADOW_LABEL = '0 2px 2px 0px rgba(0, 0, 0, 0.4)';
export const BOX_SHADOW_FIELD = '0 2px 2px 0px rgba(0, 0, 0, 0.4)';
export const FORGOT_PASSWORD = {float: 'right', marginRight: '10px'};
export const FORM_BUTTON = {borderRadius: '50px', width: '40%', marginLeft: '30%'};

export const LOGIN_FROM_STYLE = {
    backgroundColor: LOGIN_FROM,
    filter: 'blur(0px)',
    height: '100%',
    boxShadow: '0 2px 2px 0px rgba(20, 20, 20, 0.5)',
};

export const LOGIN_BODY_STYLE = {
    top: '0px',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    width: '100%',
    height: '100%',
    zIndex:'-50',
    WebkitFontSmoothing: 'antialiased',
    backgroundColor: LOGIN_BACKGROUND,
    position: 'absolute',
};

