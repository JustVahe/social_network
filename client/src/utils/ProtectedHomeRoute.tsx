import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/typedHooks";
import { selectIsAuth } from "../redux/slices/isAuthSlice";
import { useCheck } from "./hooks/useCheck";
import { selectCurrentUser } from "../redux/slices/currentUserSlice";
import "../animation.css"

const ProtectedHomeRoute = () => {

    const location = useLocation();
    const isAuth = useAppSelector(selectIsAuth);
    const currentUser = useAppSelector(selectCurrentUser);
    const [ok, setOk] = useState(false);

    const { checkAccessToken } = useCheck();

    useEffect(() => {
        checkAccessToken();

        setTimeout(() => setOk(true), 1000);
        //eslint-disable-next-line
    }, []);

    if (!isAuth || !currentUser || !ok) {
        return <div className="fixed w-full h-screen bg-sky-600 grid place-items-center">
            <div className="loader"></div>
        </div>
    } 

    if (ok) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
    

};

export default ProtectedHomeRoute;