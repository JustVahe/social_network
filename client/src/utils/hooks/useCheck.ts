import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/typedHooks";
import { setIsAuth } from "../../redux/slices/isAuthSlice";
import {url } from "../enviromentConfig";
import { setUser } from "../../redux/slices/currentUserSlice";
import { api } from "../../axios/axios";

export const useCheck = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tokenRefreshHandler = async () => {

        try {

            const response = await api.post(`${url}/auth/refresh`, {
                refreshToken: localStorage.refreshToken
            });
            if (response.status !== 200) throw new Error("Unauthorized");
            localStorage.setItem("authorization", response.data.data.newAccessToken);
            checkAccessToken();

        } catch (error) {

            navigate("/signIn");
            localStorage.clear();
            dispatch(setIsAuth(false));
            return 1;
        }
    }

    const checkAccessToken = async () => {

        try {
            const response = await api.get(`${url}/user/dashboard`);
            if (response.status !== 200) throw new Error("Unauthorized");
            dispatch(setUser(response.data.data));
        } catch (error) {
            await tokenRefreshHandler();
        }
    }

    return { checkAccessToken };

}