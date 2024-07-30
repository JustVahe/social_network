import axios from "axios";
import { url } from "../utils/enviromentConfig";

export const api = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

api.interceptors.request.use(request => {
    const fullUrl = axios.getUri(request);
    if (fullUrl.endsWith("login") || fullUrl.endsWith("register"))
        throw new Error("Unnessesary Interception");

    const authToken = localStorage.getItem("authorization");
    if (authToken) request.headers.Authorization = `Bearer ${authToken}`;
    return request;
}, error => {
    console.log(error);
    Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    async error => {
        const status = error.response ? error.response.status : null;
        const prevRequest = error.config;
        if (status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const response = await axios.post(`${url}/auth/refresh`, {
                refreshToken: localStorage.refreshToken
            });
            localStorage.setItem("authorization", response.data.data.newAccessToken);
            prevRequest.headers["Authorization"] = `Bearer ${response.data.data.newAccessToken}`;
            return api(prevRequest);
        }
    }
)