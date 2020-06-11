import {
    ACTION_ADD_MODELS,
    ACTION_ADD_MODELS_STORE,
    ACTION_CLEAR_MODELS,
    ACTION_CLEAR_MODELS_STORE,
    ACTION_GET_MODELS,
    ACTION_GET_MODELS_STORE
} from "../values";


export const getModels = () => {
    return {type: ACTION_GET_MODELS};
};

export const addModels = (models) => {
    return {type: ACTION_ADD_MODELS, payload: models};
};

export const getModelsStore = () => {
    return {type: ACTION_GET_MODELS_STORE};
};

export const addModelsStore = (models) => {
    return {type: ACTION_ADD_MODELS_STORE, payload: models};
};

export const clearModelsStore = () => {
    return {type: ACTION_CLEAR_MODELS_STORE};
};

export const clearModels = () => {
    return {type: ACTION_CLEAR_MODELS};
};
