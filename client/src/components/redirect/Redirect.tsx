import { VscLoading } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectIsAuth } from "../../redux/slices/isAuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, setUser } from "../../redux/slices/currentUserSlice";
import { useCheck } from "../../utils/hooks/useCheck";
import { url } from "../../utils/enviromentConfig";

export default function Redirect() {

    const isAuth = useAppSelector(selectIsAuth);
    const { checkAccessToken } = useCheck();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {

        checkAccessToken();

        async function loginRedirectHandle() {

            try {
                if (!isAuth) navigate("/signIn");
                else {
                    const loginResponse = await fetch(`${url}/dashboard`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${localStorage.authorization}`
                        },
                    });

                    const data = await loginResponse.json();
                    dispatch(setUser(data));
                    navigate("/" + currentUser?.username + "/home");
                }
            } catch (error) {
                console.error(error);
            }

        }

        loginRedirectHandle();
        //eslint-disable-next-line
    }, [isAuth, navigate, currentUser, dispatch]);

    return (
        <div className="w-full h-screen bg-sky-600 grid place-items-center">
            <div className="text-white">
                Loading <VscLoading />
            </div>
        </div>
    )
}
