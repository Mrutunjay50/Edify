import axios from 'axios';
const url1 = "https://edify-backend-service.onrender.com";
const url2 = "http://localhost:8800"

const apiurl = axios.create({
    baseURL : `${url2}`,
});

export default apiurl;

// https://edify-backend-service.onrender.com