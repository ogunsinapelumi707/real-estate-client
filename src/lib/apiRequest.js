import axios from "axios";
//const apiUrl = import.meta.env.VITE_API_URL;
const apiUrl = import.meta.env.VITE_API_URL;
//const apiUrl = "http://localhost:8800/api/";

const apiReuest = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})

export default apiReuest 