import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ValidationError } from "yup"
import { signInScheme } from "../../validations/SignInValidation";
import { useAppDispatch } from "../../redux/typedHooks";
import { setIsAuth } from "../../redux/slices/isAuthSlice";
import { setUser } from "../../redux/slices/currentUserSlice";
import { ToastContainer } from "react-toastify";
import { notifyError } from "../../utils/toastification";

export default function SignIn() {

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const [emailError, setEmailError] = useState<ValidationError | undefined>();
    const [passwordError, setPasswordError] = useState<ValidationError | undefined>();

    const [generalError, setGeneralError] = useState<Error | undefined>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.clear();
        dispatch(setUser(null));
        // eslint-disable-next-line
    }, []);

    const signInHandler = async (event: FormEvent) => {

        event.preventDefault();

        const formBody = {
            email, password
        }

        try {

            const validation = await signInScheme.validate(formBody, {
                abortEarly: false
            });

            console.log(validation);


            if (validation) {

                setEmailError(undefined);
                setPasswordError(undefined);

                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(validation)
                });

                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.message);
                } else {
                    localStorage.setItem("authorization", data.accessToken);
                    localStorage.setItem("refreshToken", data.refreshToken);

                    dispatch(setIsAuth(true));
                    navigate("/");
                    setGeneralError(undefined);
                }



            }

        } catch (error) {

            const errors = error as ValidationError;
            const validationErrorInner: ValidationError[] = errors.inner;

            if (validationErrorInner) {
                setPasswordError(validationErrorInner.find((item: ValidationError) => item.type === "password"));
                notifyError(passwordError?.message as string);
                setEmailError(validationErrorInner.find((item: ValidationError) => item.type === "email"));
                notifyError(emailError?.message as string);
            } else {
                setGeneralError(errors);
                notifyError(generalError?.message as string);
            }

        }

    }

    return (
        <div className='w-[400px] min-h-[500px] rounded-md relative z-10 mx-auto bg-white flex flex-col justify-between'>
            <div className='w-full h-1.5 bg-sky-600 rounded-t-md'></div>
            <img src="/logo.png" alt="logo" className='mx-auto mt-[35px]' />
            <div className='p-[15px] px-[30px] h-full'>
                <h1 className='text-3xl text-zinc-800 font-bold mt-[50px] tracking-tight mb-[5px] leading-[40px]'> Welcome Back</h1>
                <p className='text-md text-zinc-500 mt-0 leading-[20px]'>Discover new and amazing expirience</p>
                <p className="text-sm text-zinc-500 italic">
                    Have no account?
                    <Link to={"/signUp"}><span className="text-sky-600 no-underline hover:underline"> Create one!</span></Link>
                </p>
                <form>
                    <input
                        onChange={(event: ChangeEvent) => {
                            const eventTarget = event.target as HTMLButtonElement;
                            setEmail(eventTarget.value)
                        }}
                        type="email"
                        placeholder='Email'
                        name="email"
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name="password"
                        onChange={(event: ChangeEvent) => {
                            const eventTarget = event.target as HTMLButtonElement;
                            setPassword(eventTarget.value)
                        }}
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 my-[15px]  rounded-md placeholder:text-zinc-500'
                    />
                    <button onClick={signInHandler} className='w-full p-[10px] text-center bg-sky-600 rounded-md text-white'>Sign In</button>
                </form>
            </div>
            <div className="rounded-b-md bg-zinc-200 p-2 text-sm-11 w-full">
                © Winku 2018. All rights reserved.
            </div>
            <ToastContainer />
        </div>
    )
}
