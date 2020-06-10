import axios from 'axios';

//baseURL: "https://backend.tacklelabs.tech"


export default axios.create({
    baseURL: "http://localhost:8000"
    //baseURL: "https://backend.tacklelabs.tech"
});

