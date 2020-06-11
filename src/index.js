import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {createStore} from "redux";
import combineReducers from "./redux/reducers/combineReducers";
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
const store = createStore(combineReducers);
ReactDOM.render(
    (<Provider store={store}>
        <App/>
    </Provider>), document.getElementById('root'));
