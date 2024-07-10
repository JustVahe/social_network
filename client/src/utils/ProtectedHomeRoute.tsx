import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/typedHooks";
import { selectIsAuth } from "../redux/slices/isAuthSlice";
import { useCheck } from "./hooks/useCheck";
import { selectCurrentUser } from "../redux/slices/currentUserSlice";

const ProtectedHomeRoute = () => {

    const location = useLocation();
    const isAuth = useAppSelector(selectIsAuth);
    const currentUser = useAppSelector(selectCurrentUser);

    const { checkAccessToken } = useCheck();

    useEffect(() => {
        checkAccessToken();
        //eslint-disable-next-line
    }, []);

    if (!isAuth) {
        return <Navigate to="/signIn" state={{ from: location }} replace />
    } else if (!currentUser) {
        return <div className="fixed w-full h-screen bg-sky-600 grid place-items-center">
            <div className="loader"></div>
        </div>
    }
    return <Navigate to="/dashboard" state={{ from: location }} replace />;

};

export default ProtectedHomeRoute;