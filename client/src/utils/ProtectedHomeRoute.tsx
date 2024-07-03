import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../redux/typedHooks";
import { selectIsAuth } from "../redux/slices/isAuthSlice";
import { useCheck } from "./hooks/useCheck";

const ProtectedHomeRoute = () => {

    const location = useLocation();
    const isAuth = useAppSelector(selectIsAuth);

    const { checkAccessToken } = useCheck();

    useEffect(() => {
        checkAccessToken();
        //eslint-disable-next-line
    }, []);

    if (!isAuth) {
        return <Navigate to="/signIn" state={{ from: location }} replace />
    }
    return <Navigate to="/dashboard" state={{ from: location }} replace />;

};

export default ProtectedHomeRoute;