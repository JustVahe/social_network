import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/typedHooks";
import { setIsAuth } from "../redux/slices/isAuthSlice";

export const useCheck = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const checkAccessToken = async () => {

        const response = await fetch("http://localhost:8246/auth/verify", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.authorization}`
            }
            })

        if (response.status === 401) {
            navigate("/signIn");
            localStorage.clear();
            dispatch(setIsAuth(false));
        }
    }


    return {checkAccessToken};

}