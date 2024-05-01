import { useParams } from "react-router-dom";
import Footer from "../components/menu/Footer";
import Menu from "../components/menu/Menu";
import Feed from "../components/feed/Feed";
import { selectUsers } from "../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { setUser } from "../redux/slices/currentUserSlice";
import { useEffect } from "react";

const MainPage = () => {

    const {id} = useParams();
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();
    const currentUser = users.find(item => item.id === id);

    useEffect(() => {
        if (users && currentUser) {
            dispatch(setUser(currentUser));
        }
    }, [currentUser, dispatch, users])
    
    return ( 
        <>
            <Menu />
            <Feed />
            <Footer />
        </>
        
     );
}
 
export default MainPage;