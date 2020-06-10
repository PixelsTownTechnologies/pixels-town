import {ACTION_ADD_REPORTS, ACTION_CLEAR_REPORTS, ACTION_GET_REPORTS} from "../values";


export const getReports = () => {
    return {type: ACTION_GET_REPORTS};
};

export const addReports = (data) => {
    return {type: ACTION_ADD_REPORTS, payload: data};
};

export const clearReports = () => {
    return {type: ACTION_CLEAR_REPORTS};
};