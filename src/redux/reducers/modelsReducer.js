import {
    ACTION_ADD_MODELS,
    ACTION_ADD_MODELS_STORE,
    ACTION_CLEAR_MODELS,
    ACTION_CLEAR_MODELS_STORE,
    ACTION_GET_MODELS,
    ACTION_GET_MODELS_STORE
} from "../values";
import {MODEL_INITIAL_VALUE, MODEL_STORE_INITIAL_VALUE} from "../InitialValues";

//state = {models:{},storeModels:{}, ...}
export default (state = {models: MODEL_INITIAL_VALUE, modelsStore: MODEL_STORE_INITIAL_VALUE}, action) => {
    switch (action.type) {
        case ACTION_CLEAR_MODELS:
            return {...state, models: MODEL_INITIAL_VALUE};
        case ACTION_GET_MODELS:
            return state;
        case ACTION_ADD_MODELS:
            return {...state, models: action.payload};
        case ACTION_CLEAR_MODELS_STORE:
            return {...state, modelsStore: MODEL_STORE_INITIAL_VALUE};
        case ACTION_GET_MODELS_STORE:
            return state;
        case ACTION_ADD_MODELS_STORE:
            return {...state, modelsStore: action.payload};
        default:
            return state;
    }
};
