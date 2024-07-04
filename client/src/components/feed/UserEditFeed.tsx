import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { selectCurrentUser, setUser } from '../../redux/slices/currentUserSlice';
import { ChangeEvent, useState } from 'react';
import { useCheck } from '../../utils/hooks/useCheck';
import { notifyError, notifySuccess } from '../../utils/toastification';
import { url } from '../../utils/enviromentConfig';

export default function UserEditFeed() {

    const currentUser = useAppSelector(selectCurrentUser);

    const [nameChange, setNameChange] = useState(false);
    const [surnameChange, setSurnameChange] = useState(false);
    const [usernameChange, setUserameChange] = useState(false);
    const [emailChange, setEmailChange] = useState(false);
    const [descriptionChange, setDescriptionChange] = useState(false);
    
    const dispatch = useAppDispatch();
    const { checkAccessToken } = useCheck();

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

        await checkAccessToken();

        const updateResponse = await fetch(`${url}/users/` + currentUser?.id, {
            method: "PUT",
            body: formData
        });
        const updateData = await updateResponse.json();

        if (updateResponse.status !== 200) {
            notifyError("Something went wrong");
        } else {
            notifySuccess("User is successfully updated");
            dispatch(setUser(updateData));
        }

    }

    return (
        currentUser &&
        <div className="container my-0">
            <form
                onSubmit={formSubmitHandler}
                className="w-full grid grid-cols-6 gap-[10px]" id='user_edit_form'>
                <div className="grid h-[500px] col-span-2 grid-rows-4 bg-[#fdfdfd] shadow-sm shadow-zinc-300 
                            rounded-md mt-[75px]">
                    <div className="col-span-2 row-span-2 w-[320px] h-[320px] place-self-center p-[10px] 
                        bg-[#fdfdfd] rounded-full relative top-[-50px] shadow-sm shadow-zinc-300">
                        <img
                            className=" block object-cover w-full h-full rounded-full"
                            src={`${url}/public/` + currentUser.avatar}
                            alt="user_avatar" />
                    </div>
                    <div className=' w-full h-full col-span-2 row-span-2 p-[10px] relative'>
                        <img
                            className="block object-cover w-full h-full rounded-md"
                            src={`${url}/public/` + currentUser.headerImg}
                            alt="user_avatar" />
                    </div>
                </div>
                <div className="flex col-span-4 flex-col gap-[25px] p-[25px] bg-[#fdfdfd] shadow-sm 
                    shadow-zinc-300 rounded-md mt-[75px]">
                    <div className="">
                        <h2 className="text-zinc-700 text-2xl font-bold ">Personal Information</h2>
                        <div className="flex gap-[15px] mt-[15px]">
                            <div>
                                <label htmlFor="user_edit_name" className="mr-[15px] text-zinc-700">Name:</label>
                                <input
                                    onChange={changeEffectHandler}
                                    type="text"
                                    className={"p-[5px] text-zinc-700 outline-none border rounded-md " + (nameChange ? "border-green-600" : "border-sky-600")}
                                    name='name'
                                    id='user_edit_name'
                                    defaultValue={currentUser.name} />
                            </div>
                            <div>
                                <label htmlFor="user_edit_surname" className="mr-[15px] text-zinc-700">Surname:</label>
                                <input
                                    onChange={changeEffectHandler}
                                    type="text"
                                    className={"p-[5px] text-zinc-700 outline-none border rounded-md " + (surnameChange ? "border-green-600" : "border-sky-600")}
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

