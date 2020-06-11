import {LOGIN_BACKGROUND, LOGIN_FROM} from "./Colors";

export const LOGIN_FROM_STYLE = {
    backgroundColor: LOGIN_FROM,
    filter: 'blur(0px)',
    height: '100%',
    boxShadow: '0 5px 5px 0px rgba(20, 20, 20, 0.5)',
};

export const LOGIN_BODY_STYLE = {
    top: '0px',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    width: '100%',
    height: '100%',
    zIndex:'-50',
    filter: 'blur(0px)',
    WebkitFontSmoothing: 'antialiased',
    backgroundColor: LOGIN_BACKGROUND,
    position: 'absolute',
};

export const LOGIN_MENU_TEXT_STYLE = {
    color: '#43c5b8',
    fontSize: '1.6em',
    fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
    fontStyle: 'normal',
    fontWeight: '900',
    marginLeft:'10px',
};
