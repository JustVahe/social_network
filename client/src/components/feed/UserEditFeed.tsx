import { useAppSelector } from '../../redux/typedHooks';
import { selectCurrentUser } from '../../redux/slices/currentUserSlice';
import { ChangeEvent, useState } from 'react';
import { url } from '../../utils/enviromentConfig';
import { useNavigate } from 'react-router-dom';
import { notifyPromise } from '../../utils/toastification';
import { api } from '../../axios/axios';

export default function UserEditFeed() {

    const currentUser = useAppSelector(selectCurrentUser);

    const [nameChange, setNameChange] = useState(false);
    const [surnameChange, setSurnameChange] = useState(false);
    const [usernameChange, setUserameChange] = useState(false);
    const [emailChange, setEmailChange] = useState(false);
    const [descriptionChange, setDescriptionChange] = useState(false);
    const [ok, setOk] = useState(true);

    const navigate = useNavigate();

    const changeEffectHandler = (event: ChangeEvent) => {

        const eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
        const name = eventTarget.name;

        if (name === "name") setNameChange(true);
        else if (name === "surname") setSurnameChange(true);
        else if (name === "email") setEmailChange(true);
        else if (name === "description") setDescriptionChange(true);
        else if (name === "username") setUserameChange(true);

    };

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const eventTarget = event.target as HTMLFormElement;
        const formData = new FormData(eventTarget);

        

        const updateResponse = await api.put(`${url}/users/` + currentUser?.id, formData, {
            headers: { "Content-Type" : "multipart/form-data"}
        });

        if (updateResponse.status !== 200) {
            throw new Error("Something went wrong");
        } else {
            
            navigate("/dashboard");
        }

    }

    const formSubmitToggler = async (event: React.FormEvent<HTMLFormElement>) => {
        if (ok) {
            setOk(false);
            await formSubmitHandler(event);
            setOk(true);
        }
    }

    return (
        currentUser &&
        <div className="container my-0">
            <form
                onSubmit={(event) => {
                    notifyPromise(formSubmitToggler(event), {
                        pendingText: "Loading...",
                        fulfilledText: "User Details are successfully updated"
                    })
                }}
                className="w-full grid grid-cols-6 gap-[10px]" id='user_edit_form'>
                <div className="flex col-span-6 flex-col gap-[25px] p-[25px] bg-[#fdfdfd] shadow-sm 
                    shadow-zinc-300 rounded-md">
                    <div className="w-full">
                        <h2 className="text-zinc-700 text-2xl font-bold ">Personal Information</h2>
                        <div className="flex gap-[15px] mt-[15px] flex-col sm:flex-row w-full">
                            <div className='w-full'>
                                <label htmlFor="user_edit_name" className="mr-[15px] text-zinc-700">Name:</label>
                                <input
                                    onChange={changeEffectHandler}
                                    type="text"
                                    className={"p-[5px] text-zinc-700 outline-none border rounded-md w-full " + (nameChange ? "border-green-600" : "border-sky-600")}
                                    name='name'
                                    id='user_edit_name'
                                    defaultValue={currentUser.name} />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="user_edit_surname" className="mr-[15px] text-zinc-700">Surname:</label>
                                <input
                                    onChange={changeEffectHandler}
                                    type="text"
                                    className={"p-[5px] text-zinc-700 outline-none border rounded-md w-full " + (surnameChange ? "border-green-600" : "border-sky-600")}
                                    name='surname'
                                    id='user_edit_surname'
                                    defaultValue={currentUser.surname} />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="user_edit_username" className="mr-[15px] text-zinc-700">Username:</label>
                        <input
                            onChange={changeEffectHandler}
                            type="text"
                            className={"p-[5px] text-zinc-700 w-full outline-none border rounded-md " + (usernameChange ? "border-green-600" : "border-sky-600")}
                            name='username'
                            id='user_edit_username'
                            defaultValue={currentUser.username} />
                    </div>
                    <div className="flex items-start">
                        <label htmlFor="user_edit_description" className="mr-[15px] text-zinc-700">Description:</label>
                        <textarea
                            onChange={changeEffectHandler}
                            className={"p-[5px] text-zinc-700 w-full outline-none border rounded-md " + (descriptionChange ? "border-green-600" : "border-sky-600")}
                            name='description'
                            id='user_edit_description'
                            defaultValue={currentUser.description} />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="user_edit_email" className="mr-[15px] text-zinc-700">Email:</label>
                        <input
                            onChange={changeEffectHandler}
                            type="email"
                            className={"p-[5px] text-zinc-700 w-full outline-none border rounded-md " + (emailChange ? "border-green-600" : "border-sky-600")}
                            name='email'
                            id='user_edit_email'
                            defaultValue={currentUser.email} />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-[10px] bg-sky-600 text-white font-bold rounded-md transition hover:bg-sky-700">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

