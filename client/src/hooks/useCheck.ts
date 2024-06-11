import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/typedHooks";
import { setIsAuth } from "../redux/slices/isAuthSlice";
import { setUser } from "../redux/slices/currentUserSlice";

export const useCheck = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tokenRefreshHandler = async () => {

        try {

            const response = await fetch("http://localhost:8246/auth/refresh", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    refreshToken: localStorage.refreshToken
                })
            });

            const data = await response.json();
            localStorage.setItem("authorization", data.accessToken);
            checkAccessToken();

        } catch (error) {

            navigate("/signIn");
            localStorage.clear();
            dispatch(setIsAuth(false));
            return 1;

        }

    }

    const checkAccessToken = async () => {

        const response = await fetch("http://localhost:8246/auth/verify", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.authorization}`
            }
        });

        if (response.status === 401) {
            await tokenRefreshHandler();
        } else {
            const data = await response.json();
            dispatch(setUser(data));
        }

    }

    return { checkAccessToken };

}