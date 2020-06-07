import React from 'react';
import Home from "../pages/home/home";
import './app.css';
import {BrowserRouter, Route} from "react-router-dom";

const NotFound  =()=>{
    return <div>Not Found 404</div>;
};

function App() {
    return (
        <div>
            <BrowserRouter>
                <Route path="*" exact component={NotFound}/>
                <Route path="/" exact component={Home}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
