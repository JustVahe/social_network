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
        try {
            const status = error.response ? error.response.status : null;
            const prevRequest = error.config;
            if (status === 401 && !prevRequest?.sent) {

                prevRequest.sent = true;
                if (!localStorage.refreshToken) throw new Error("No Refresh Token");

                const response = await axios.post(`${url}/auth/refresh`, {
                    refreshToken: localStorage.refreshToken
                });
                if (response.status !== 200) throw new Error("Invalid Refresh Token");

                localStorage.setItem("authorization", response.data.newAccessToken);
                prevRequest.headers["Authorization"] = `Bearer ${response.data.newAccessToken}`;
                return api(prevRequest);
            }
        } catch (error) {
            window.location.href = "/signIn";
        }

    }
)