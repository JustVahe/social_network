import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/logo.png"
import { ChangeEvent, FormEvent, useState } from "react";
import { signInScheme } from "../../validations/SignInValidation";
import { ValidationError } from "yup";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectUsers } from "../../redux/slices/userSlice";
import { setUser } from "../../redux/slices/currentUserSlice";

export default function SignIn() {

    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [usernameError, setUsernameError] = useState<ValidationError | undefined>();
    const [passwordError, setPasswordError] = useState<ValidationError | undefined>();

    const [username,  setUsername] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const signInHandler = async (event : FormEvent) => {
        
        event.preventDefault();

        const formData = {
            username : username,
            password : password
        }

        try {

            console.log(users);
            
            
            const validation = await signInScheme.validate(formData, {
                abortEarly : false
            })

            if (users) {
                const isRightUsername = users.some(item => item.username === validation.username);
                console.log(isRightUsername);
                
                if (isRightUsername) {
                    const currentUser = users.find(item => item.password === validation.password);
                    console.log(currentUser);
                    
                    if (currentUser) {
                        dispatch(setUser(currentUser));
                        navigate("/feed")
                        setUsernameError(undefined);
                        setPasswordError(undefined);  
                    }else{
                        throw new ValidationError("Incorrect Password");
                    }
                }else {
                    throw new ValidationError("Incorrect Username");
                }
            }

        } catch (error : unknown) {
            
            const validationError : ValidationError = error as ValidationError;
            const validationErrorInner : ValidationError[] = validationError.inner;

            if (validationError!.inner) {

                setUsernameError(validationErrorInner.find((item : ValidationError) => item.type === "username"));
                setPasswordError(validationErrorInner.find((item : ValidationError) => item.type === "password"));

            }            
            
        }

    }

  return (
    <div className='w-[400px] min-h-[500px] rounded-md relative z-10 mx-auto bg-white flex flex-col justify-between'>
        <div className='w-full h-1.5 bg-sky-600 rounded-t-md'></div>
        <img src={logo} alt="logo" className='mx-auto mt-[35px]' />
        <div className='p-[15px] px-[30px] h-full'>
            <h1 className='text-3xl text-zinc-800 font-bold mt-[50px] tracking-tight mb-[5px] leading-[40px]'> Welcome Back</h1>
            <p className='text-md text-zinc-500 mt-0 leading-[20px]'>Discover new and amazing expirience</p>
            <p className="text-sm text-zinc-500 italic">
                Have no account? 
                <Link to={"/signUp"}><span className="text-sky-600 no-underline hover:underline"> Create one!</span></Link>
            </p>
            <form>
                {
                    usernameError && 
                        <p className="w-full bg-sky-100 border-2 border-sky-600 p-[5px] rounded-md mt-[10px]">
                            {usernameError.message} 
                        </p>
                }
                <input type="text" placeholder='Username' name="username" onChange={(event : ChangeEvent) => {
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
                <input type="password" placeholder='Password' name="password" onChange={(event : ChangeEvent) => {
                            const eventTarget = event.target  as HTMLButtonElement;
                            setPassword(eventTarget.value)
                        }}
                        className='w-full p-[10px] text-zinc-800 border-2 border-sky-600 my-[15px]  rounded-md placeholder:text-zinc-500'/>
                <button onClick={signInHandler} className='w-full p-[10px] text-center bg-sky-600 rounded-md text-white'>Sign In</button>
            </form>
        </div>
        <div className="rounded-b-md bg-zinc-200 p-2 text-sm-11 w-full">
                © Winku 2018. All rights reserved.
            </div>
    </div>
  )
}
