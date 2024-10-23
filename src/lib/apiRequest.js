import axios from "axios";

const apiReuest = axios.create({
    baseURL: "http://localhost:8800/api",
    withCredentials: true
})

export default apiReuest 