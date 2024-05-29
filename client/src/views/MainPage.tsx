import Footer from "../components/Footer";
import Menu from "../components/menu/Menu";
import Feed from "../components/feed/Feed";
import { useAppDispatch,  } from "../redux/typedHooks";
import { useEffect } from "react";
import { setUsers } from "../redux/slices/userSlice";

const MainPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {

        async function loginRedirectHandle() {

            const usersResponse = await fetch("/api/users");
            const data = await usersResponse.json();
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