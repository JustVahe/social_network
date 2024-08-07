import SignIn from "../components/forms/SignIn";
import SignUp from "../components/forms/SignUp";

const WelcomePage = ({ type }: { type: string }) => {

    return (
        <div
            style={{ background: "url('./headerImg.webp')" }}
            className="w-full bg-cover bg-no-repeat relative py-[150px]
                        after:w-full after:h-full after:bg-blue-950 after:content-normal after:block after:bg-opacity-45 
                        after:absolute after:top-0 after:left-0">
            {type === "signIn" ? <SignIn /> : type === "signUp" ? <SignUp /> : ""}
        </div>
    );
}

export default WelcomePage;