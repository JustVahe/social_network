
import { VscLoading } from "react-icons/vsc";
import { useAppSelector } from "../../redux/typedHooks";
import { selectIsAuth } from "../../redux/slices/isAuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {

    const isAuth = useAppSelector(selectIsAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate("/signIn");
        else navigate("/dashboard")
    }, [isAuth, navigate]);

    return (
        <div className="w-full h-screen bg-sky-600 grid place-items-center">
            <div className="text-white">
                Loading <VscLoading />
            </div>
        </div>
    )
}
