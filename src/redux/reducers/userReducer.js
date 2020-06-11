import {ACTION_ADD_HOSPITAL, ACTION_GET_USER, ACTION_SIGN_IN, ACTION_UPDATE_USER} from "../values";

export default (state = {}, action) => {
    switch (action.type) {
        case ACTION_SIGN_IN:
            return action.payload;
        case ACTION_UPDATE_USER:
            return {user: {...state.user, ...action.payload}};
        case ACTION_GET_USER:
            return state;
        case ACTION_ADD_HOSPITAL:
            return {user:{...state.user,...action.payload}};
        default:
            return state;
    }
};
