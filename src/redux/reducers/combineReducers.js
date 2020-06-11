import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import userReducer from "./userReducer";
import modelsReducer from "./modelsReducer";
import reportReducers from "./reportReducers";

export default combineReducers(
    {
        form: formReducer,
        user: userReducer,
        model: modelsReducer,
        report: reportReducers,
    }
);
