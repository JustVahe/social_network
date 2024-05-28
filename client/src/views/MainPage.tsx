import Footer from "../components/Footer";
import Menu from "../components/menu/Menu";
import Feed from "../components/feed/Feed";
import { useAppDispatch,  } from "../redux/typedHooks";
import { setUser } from "../redux/slices/currentUserSlice";
import { useEffect } from "react";
import { setUsers } from "../redux/slices/userSlice";

const MainPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {

        async function loginRedirectHandle() {
            const loginResponse = await fetch("http://localhost:8246/dashboard", {
                method: "GET",
                headers: {
                    "accessToken": localStorage.accessToken
                }
            });

            const data = await loginResponse.json();
            console.log(data);
            dispatch(setUser(data));
        }

        loginRedirectHandle();

    }, [dispatch]);

    useEffect(() => {

        async function loginRedirectHandle() {

            const usersResponse = await fetch("http://localhost:8246/users");
            const data = await usersResponse.json();
            console.log(data);
            dispatch(setUsers(data));
        }

        loginRedirectHandle();

    })

    return (
        <>
            <Menu />
            <Feed />
            <Footer />
        </>

    );
}

export default MainPage;