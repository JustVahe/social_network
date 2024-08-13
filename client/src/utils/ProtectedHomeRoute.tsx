import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { selectCurrentUser, setUser } from "../redux/slices/currentUserSlice";
import "../animation.css";
import { url } from "./enviromentConfig";
import { api } from "../axios/axios";

const ProtectedHomeRoute = () => {

    const location = useLocation();
    const currentUser = useAppSelector(selectCurrentUser);
    const [ok, setOk] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`${url}/users/dashboard`).then(response => {
            if (response.status !== 200 || !response.data) return navigate("/signIn");
            dispatch(setUser(response.data));
            setOk(true)
        });
        //eslint-disable-next-line
    }, []);

    if (!currentUser || !ok) {
        return <div className="fixed w-full h-screen bg-sky-600 grid place-items-center">
            <div className="loader"></div>
        </div>
    } 

    if (ok) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
};

export default ProtectedHomeRoute;