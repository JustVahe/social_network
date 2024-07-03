import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signUpScheme } from "../../validations/SignUpValidation";
import { ValidationError } from "yup";
import { useAppDispatch } from "../../redux/typedHooks";
import { setIsAuth } from "../../redux/slices/isAuthSlice";
import { setUser } from "../../redux/slices/currentUserSlice";
import { notifyError } from "../../utils/toastification";

export default function SignUp() {
    const [nameError, setNameError] = useState<ValidationError | undefined>();
    const [surnameError, setSurnameError] = useState<ValidationError | undefined>();
    const [emailError, setEmailError] = useState<ValidationError | undefined>();
    const [passwordError, setPasswordError] = useState<ValidationError | undefined>();
    const [generalError, setGeneralError] = useState<Error | null>();
    const [name, setName] = useState<string | undefined>();
    const [surname, setSurname] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(setUser(null));
    }, [dispatch]);

    const signUpHandler = async (event: FormEvent) => {

        event.preventDefault();

        const formBody = {
            name, surname, email, password
        }

        try {

            const validation = await signUpScheme.validate(formBody, {
                abortEarly: false
            });

            if (validation) {

                setNameError(undefined);
                setSurnameError(undefined);
                setPasswordError(undefined);
                setEmailError(undefined);

                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(validation)
                });

                const data = await response.json();

                if (response.status !== 200) {
                    throw new Error(data.error.message);
                }

                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                dispatch(setIsAuth(true));
                navigate("/");
                setGeneralError(null);
                
            }

        } catch (error: unknown) {

            const errors = error as ValidationError;
            const validationErrorInner: ValidationError[] = errors.inner;

            if (validationErrorInner) {

                const validateManager = ({ name, message }: { name: string, message: string }) => {
                    setNameError(validationErrorInner.find((item: ValidationError) => item.type === name));
                    notifyError(message);            
                }

                const fields = [
                    {
                        name: 'name',
                        message: nameError?.message || ''
                    },
                    {
                        name: 'surname',
                        message: surnameError?.message  || ''
                    },
                    {
                        name: 'password',
                        message: passwordError?.message || ''
                    },
                    {
                        name: 'email',
                        message:emailError?.message || ''
                    }
                ]

                fields.forEach(validateManager)
            } else {
                setGeneralError(errors);
                notifyError(generalError?.message  || '');
            }

        }

    }

    return (
        <div className='w-[400px] min-h-[600px] rounded-md relative z-10 mx-auto bg-white flex flex-col flex-grow justify-between'>
            <div className='w-full h-1.5 bg-sky-600 rounded-t-md'></div>
            <img src="/logo.png" alt="logo" className='mx-auto mt-[35px]' />
            <div className='p-[15px] px-[30px] h-full'>
                <h1 className='text-3xl text-zinc-800 font-bold mt-[50px] tracking-tight mb-[5px] leading-[40px]'> Join Us</h1>
                <p className='text-md text-zinc-500 mt-0 leading-[20px]'>Discover new and amazing expirience</p>
                <p className="text-sm text-zinc-500 italic">
                    Already have an account?
                    <Link to={"/signIn"}><span className="text-sky-600 no-underline hover:underline"> Then sign in!</span></Link>
                </p>
                <form>
                    <input
                        onChange={(event: ChangeEvent) => {
                            const eventTarget = event.target as HTMLButtonElement;
                            setName(eventTarget.value)
                        }}
                        type="text"
                        placeholder='Name'
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500' />
                    <input
                        onChange={(event: ChangeEvent) => {
                            const eventTarget = event.target as HTMLButtonElement;
                            setSurname(eventTarget.value)
                        }}
                        type="text"
                        placeholder='Surname'
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500' />
                    <input
                        onChange={(event: ChangeEvent) => {
                            const eventTarget = event.target as HTMLButtonElement;
                            setEmail(eventTarget.value)
                        }}
                        type="email"
                        placeholder='Email'
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500' />
                    <input
                        onChange={(event: ChangeEvent) => {
                            const eventTarget = event.target as HTMLButtonElement;
                            setPassword(eventTarget.value)
                        }}
                        type="password"
                        placeholder='Password'
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 my-[15px]  rounded-md placeholder:text-zinc-500' />
                    <button
                        onClick={(event) => {
                            signUpHandler(event)
                        }}
                        type="submit" className='w-full p-[10px] text-center bg-sky-600 rounded-md text-white'>Sign In</button>
                </form>
            </div>
            <div className="rounded-b-md bg-zinc-200 p-2 text-sm-11 w-full mt-[30px]">
                © Winku 2018. All rights reserved.
            </div>
        </div>
    )


}
