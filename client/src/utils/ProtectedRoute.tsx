import { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { api } from "../axios/axios";
import { selectCurrentUser, setUser } from "../redux/slices/currentUserSlice";
import { url } from "./enviromentConfig";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {

    const currentUser = useAppSelector(selectCurrentUser);
    const [ok, setOk] = useState(false);
    const dispatch = useAppDispatch();


    useEffect(() => {
        api.get(`${url}/users/dashboard`).then(response => {
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

    if (ok) return children;

};

export default ProtectedRoute;