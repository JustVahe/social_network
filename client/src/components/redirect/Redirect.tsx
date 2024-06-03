import { VscLoading } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectIsAuth } from "../../redux/slices/isAuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, setUser } from "../../redux/slices/currentUserSlice";

export default function Redirect() {

    const isAuth = useAppSelector(selectIsAuth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {

        async function loginRedirectHandle() {

            try {
                if (!isAuth) navigate("/signIn");
                else {
                    const loginResponse = await fetch("/api/dashboard", {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${localStorage.authorization}`
                        },
                    });

                    const data = await loginResponse.json();
                    console.log(data);
                    console.log(currentUser);
                    console.log("/" + currentUser?.username);



                    dispatch(setUser(data));
                    navigate("/" + currentUser?.username);
                }
            } catch (error) {
                console.log(error);
                
            }

            


        }

        loginRedirectHandle();

    }, [isAuth, navigate, currentUser, dispatch]);

    return (
        <div className="w-full h-screen bg-sky-600 grid place-items-center">
            <div className="text-white">
                Loading <VscLoading />
            </div>
        </div>
    )
}
