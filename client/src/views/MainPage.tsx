import Footer from "../components/menu/Footer";
import Menu from "../components/menu/Menu";
import Feed from "../components/feed/Feed";
import { useEffect } from "react";
import { useCheck } from "../utils/hooks/useCheck";

const MainPage = () => {

    const {checkAccessToken} = useCheck();

    useEffect(() => {
        checkAccessToken();
    //eslint-disable-next-line
    }, []);

    return (
        <>
            <Menu />
            <Feed />
            <Footer />
        </>

    );
}

export default MainPage;