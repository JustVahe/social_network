import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { TfiMenu } from 'react-icons/tfi';
import { useState } from 'react';
import { selectCurrentUser, setAvatar } from '../../redux/slices/currentUserSlice';
import 'react-toastify/dist/ReactToastify.css';
import { notifyPromise } from '../../utils/toastification';
import { imageUrl, url } from '../../utils/enviromentConfig';
import { api } from '../../axios/axios';

export default function ProtectedUserNavbar() {

    const [dropdownToggle, setDropdownToggle] = useState(false);
    const [avatarToggle, setAvatarToggle] = useState<boolean>(false);
    const [avatarError, setAvatarError] = useState<string | undefined>();
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const formData = new FormData();

    async function avatarUploadHandle(eventTarget: HTMLInputElement) {

        try {
            if (eventTarget.files) {

                
                formData.append('file', eventTarget.files[0]);

                const updateResponse = await api.put(`${url}/files/${currentUser?.id}/avatar`, formData, {
                    headers: { "Content-Type" : "multipart/form-data"}
                });

                if (updateResponse.status !== 200) {
                    setAvatarError(updateResponse.data.message);
                    throw new Error(updateResponse.data);
                }

                dispatch(setAvatar(updateResponse.data.avatar));

            }
        } catch (error) {
            throw new Error("401");
        }


    }

    return (
        <>
            <div className='relative'>
                <div className="w-full bg-white p-5 flex gap-[50px] items-center">
                    <div className="flex gap-5 items-center max-w-[600px] mx-auto md:ml-[200px] lg:ml-[350px] lg:mr-auto">
                        <div>
                            <h2 className="text-sky-600 font-semibold text-lg">{currentUser?.name} {currentUser?.surname}</h2>
                            <p className="text-zinc-400 text-sm-14">{currentUser?.description}</p>
                        </div>
                        <div className='hidden md:flex md:items-center md:gap-[20px]'>
                            <NavLink to={"/dashboard"}>
                                {({ isActive }) => {
                                    return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Timeline</p>
                                }}
                            </NavLink>
                            <NavLink to={"/dashboard/photos"}>
                                {({ isActive }) => {
                                    return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Photos</p>
                                }}
                            </NavLink>
                            <NavLink to={"/dashboard/friends"}>
                                {({ isActive }) => {
                                    return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Friends</p>
                                }}
                            </NavLink>
                            <NavLink to={"/dashboard/messages"}>
                                {({ isActive }) => {
                                    return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Messages</p>
                                }}
                            </NavLink>
                        </div>
                        <button className='w-10 h-10 grid place-items-center md:hidden text-xl text-zinc-400 relative'
                            onClick={() => setDropdownToggle(prev => !prev)}>
                            <TfiMenu />
                            <div className={'absolute w-[100px] bg-sky-600 top-[60px] ' + (dropdownToggle ? "block" : "hidden")}>
                                <Link to={"/dashboard"}>
                                    <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Timeline</p>
                                </Link>
                                <Link to={"/dashboard/photos"}>
                                    <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Photos</p>
                                </Link>
                                <Link to={"/dashboard/friends"}>
                                    <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Friends</p>
                                </Link>
                                <Link to={"/dashboard/messages"}>
                                    <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Messages</p>
                                </Link>
                            </div>
                        </button>
                    </div>
                </div>
                <div
                    onMouseEnter={() => setAvatarToggle(true)} onMouseLeave={() => setAvatarToggle(false)}
                    className="shadow-sm shadow-zinc-300 w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[190px] lg:h-[190px] bg-white rounded-full grid place-items-center absolute top-[-90px] left-[35%] sm:left-[40%] md:top-[-60px] md:left-[70px] lg:top-[-130px] lg:left-[150px]">
                    <img
                        src={`${imageUrl}` + currentUser?.avatar}
                        className="rounded-full object-cover object-top w-20 h-20 
                    md:w-[120px] md:h-[120px] lg:w-[170px] lg:h-[170px] relative"
                        alt="avatar" />
                    <label
                        htmlFor="avatar"
                        className={`p-[5px] transition bg-sky-800/30 hover:bg-sky-600/90 rounded-md text-sm-13 
                    text-bold text-white backdrop-blur-md absolute top-[120px] ${avatarToggle ? "opacity-100" : "opacity-0"}`}>
                        Set Avatar
                    </label>
                    <input onChange={(event) => {
                        const eventTarget = event.target as HTMLInputElement;
                        if (avatarError) {
                            notifyPromise(avatarUploadHandle(eventTarget),{
                                pendingText: "Loading...",
                                fulfilledText: "Avatar Successfully updated",
                            })   
                        } else {
                            notifyPromise(avatarUploadHandle(eventTarget),{
                                pendingText: "Loading...",
                                fulfilledText: "Avatar Successfully updated",
                            });
                        }
                                             
                    }} type="file" id='avatar' className='hidden' />
                </div>
            </div>

        </>

    )
}
