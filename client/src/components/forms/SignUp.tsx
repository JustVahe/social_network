import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent, useState} from "react";
import { signUpScheme } from "../../validations/SignUpValidation";
import { ValidationError } from "yup";

export default function SignUp() {

    const [nameError, setNameError] = useState<ValidationError | undefined>();
    const [surnameError, setSurnameError] = useState<ValidationError | undefined>();
    const [usernameError, setUsernameError] = useState<ValidationError | undefined>();
    const [passwordError, setPasswordError] = useState<ValidationError | undefined>();

    const [name, setName] = useState<string | undefined>();
    const [surname, setSurname] = useState<string | undefined>();
    const [username, setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const signUpHandler = async (event : FormEvent) => {

        event.preventDefault();

        const formData = {
            name : name,
            surname : surname,
            username : username,
            password : password
        }

        try {
            
            const validation = await signUpScheme.validate(formData, {
                abortEarly : false
            })

            setNameError(undefined);
            setSurnameError(undefined);
            setUsernameError(undefined);
            setPasswordError(undefined);

        } catch (error : unknown) {

            const validationError : ValidationError = error as ValidationError;
            const validationErrorInner : ValidationError[] = validationError.inner;

            if (validationError!.inner) {

                setNameError(validationErrorInner.find((item : ValidationError) => item.type === "name"));
                setSurnameError(validationErrorInner.find((item : ValidationError) => item.type === "surname"));
                setUsernameError(validationErrorInner.find((item : ValidationError) => item.type === "username"));
                setPasswordError(validationErrorInner.find((item : ValidationError) => item.type === "password"));

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
                    <Link to={"/"}><span className="text-sky-600 no-underline hover:underline"> Then sign in!</span></Link>
                </p>
                <form>
                    {
                        nameError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {nameError.message}
                            </p>
                    }
                    <input type="text" placeholder='Name' onChange={(event : ChangeEvent) => {
                            const eventTarget = event.target  as HTMLButtonElement;
                            setName(eventTarget.value)
                        }}
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'/>
                    {
                        surnameError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {surnameError.message}
                            </p>
                    }
                    <input type="text" placeholder='Surname' onChange={(event : ChangeEvent) => {
                            const eventTarget = event.target  as HTMLButtonElement;
                            setSurname(eventTarget.value)
                        }}
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'/>
                    {
                        usernameError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {usernameError.message}
                            </p>
                    }
                    <input type="text" placeholder='Username' onChange={(event : ChangeEvent) => {
                            const eventTarget = event.target  as HTMLButtonElement;
                            setUsername(eventTarget.value)
                        }}
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'/>
                    {
                        passwordError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {passwordError.message}
                            </p>
                    }
                    <input type="password" placeholder='Password' onChange={(event : ChangeEvent) => {
                            const eventTarget = event.target  as HTMLButtonElement;
                            setPassword(eventTarget.value)
                        }}
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 my-[15px]  rounded-md placeholder:text-zinc-500'/>
                    <button onClick={signUpHandler} type="submit" className='w-full p-[10px] text-center bg-sky-600 rounded-md text-white'>Sign In</button>
                </form>
            </div>
            <div className="rounded-b-md bg-zinc-200 p-2 text-sm-11 w-full mt-[30px]">
                © Winku 2018. All rights reserved.
            </div>
      </div>
    )
}
