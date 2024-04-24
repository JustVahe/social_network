import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { useState} from "react";
import { IValidationError, signUpScheme } from "../../validations/SignUpValidation";

export default function SignUp() {

    const [nameError, setNameError] = useState<IValidationError | undefined>();
    const [surnameError, setSurnameError] = useState<IValidationError | undefined>();
    const [usernameError, setUsernameError] = useState<IValidationError | undefined>();
    const [passwordError, setPasswordError] = useState<IValidationError | undefined>();

    interface IFormData {
        name : string,
        surname : string,
        username : string,
        password : string
    }

    const signUpHandler = async (event : SubmitEvent) => {

        event.preventDefault();

        const formData : IFormData = {
            name : event.target[0].value,
            surname : event.target[1].value,
            username : event.target[2].value,
            password : event.target[3].value
        }

        try {
            
            const validation = await signUpScheme.validate(formData, {
                abortEarly : false
            })

            setNameError(undefined);
            setSurnameError(undefined);
            setUsernameError(undefined);
            setPasswordError(undefined);

        } catch (error : any) {

            if (error) {

                setNameError(error.inner.find((item : IValidationError) => item.type === "name"));
                setSurnameError(error.inner.find((item : IValidationError) => item.type === "surname"));
                setUsernameError(error.inner.find((item : IValidationError) => item.type === "username"));
                setPasswordError(error.inner.find((item : IValidationError) => item.type === "password"));

                console.log(error.inner);
            }            
            
        }

    }

    return (
      <div className='w-[400px] min-h-[600px] rounded-md relative z-10 mx-auto bg-white flex flex-col flex-grow justify-between'>
            <div className='w-full h-1.5 bg-sky-600 rounded-t-md'></div>
            <img src={logo} alt="logo" className='mx-auto mt-[35px]' />
            <div className='p-[15px] px-[30px] h-full'>
                <h1 className='text-3xl text-zinc-800 font-bold mt-[50px] tracking-tight mb-[5px] leading-[40px]'> Join Us</h1>
                <p className='text-md text-zinc-500 mt-0 leading-[20px]'>Discover new and amazing expirience</p>
                <p className="text-sm text-zinc-500 italic">
                    Already have an account?
                    <Link to={"/"}><span className="text-sky-600 no-underline hover:underline"> Then sign in!</span></Link>
                </p>
                <form onSubmit={signUpHandler}>
                    {
                        nameError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {nameError.message}
                            </p>
                    }
                    <input type="text" placeholder='Name'
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'/>
                    {
                        surnameError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {surnameError.message}
                            </p>
                    }
                    <input type="text" placeholder='Surname'
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'/>
                    {
                        usernameError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {usernameError.message}
                            </p>
                    }
                    <input type="text" placeholder='Username'
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 mt-[15px] mb-0 rounded-md placeholder:text-zinc-500'/>
                    {
                        passwordError && 
                            <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                                {passwordError.message}
                            </p>
                    }
                    <input type="password" placeholder='Password'
                            className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 my-[15px]  rounded-md placeholder:text-zinc-500'/>
                    <button type="submit" className='w-full p-[10px] text-center bg-sky-600 rounded-md text-white'>Sign In</button>
                </form>
            </div>
            <div className="rounded-b-md bg-zinc-200 p-2 text-sm-11 w-full mt-[30px]">
                © Winku 2018. All rights reserved.
            </div>
      </div>
    )
}
