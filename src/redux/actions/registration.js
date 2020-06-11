import {ACTION_ADD_HOSPITAL, ACTION_GET_USER, ACTION_SIGN_IN, ACTION_UPDATE_USER} from "../values";

export const signIn = (data) => {
    return {type: ACTION_SIGN_IN, payload: data};
};

export const getUser = () => {
    return {type: ACTION_GET_USER};
};

export const updateUserData = (data) => {
    return {type: ACTION_UPDATE_USER, payload: data};
};

export const addHospital = (data) => {
    return {type: ACTION_ADD_HOSPITAL, payload: data};
};