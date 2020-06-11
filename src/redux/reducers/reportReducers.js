import {ACTION_ADD_REPORTS, ACTION_CLEAR_REPORTS, ACTION_GET_REPORTS} from "../values";
import {REPORTS_INITIAL_VALUE} from "../InitialValues";

//state = {reports:{}}
export default (state = {reports: REPORTS_INITIAL_VALUE}, action) => {
    switch (action.type) {
        case ACTION_CLEAR_REPORTS:
            return {...state, reports: REPORTS_INITIAL_VALUE};
        case ACTION_GET_REPORTS:
            return state;
        case ACTION_ADD_REPORTS:
            return {...state, reports: action.payload};
        default:
            return state;
    }
};
