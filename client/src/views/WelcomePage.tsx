import { useEffect } from "react";
import SignIn from "../components/forms/SignIn";
import SignUp from "../components/forms/SignUp";
import { useAppDispatch } from "../redux/typedHooks";
import { setUsers } from "../redux/slices/userSlice";

const WelcomePage = ({type} : {type : string}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
        .then((res) =>{ 
          return res.json()
        })
        .then(data => {
            dispatch(setUsers(data));
        })
    }, [dispatch])

    return ( 
        <div className="w-full h-screen bg-[url('./headerImg.jpg')] bg-cover bg-no-repeat relative py-[150px]
                        after:w-full after:h-full after:bg-blue-950 after:content-normal after:block after:bg-opacity-45 
                        after:absolute after:top-0 after:left-0">
            {type === "signIn" ? <SignIn /> : type === "signUp" ? <SignUp /> : ""}
        </div>
    );
}
 
export default WelcomePage;