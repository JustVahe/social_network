import { Link, NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { TfiMenu } from 'react-icons/tfi';
import { useState } from 'react';
import { selectCurrentUser, setUser } from '../../redux/slices/currentUserSlice';
import { IUser } from '../../types';
import { useCheck } from '../../hooks/useCheck';

export default function UserNavbar({ thisUser }: { thisUser: IUser }) {

    const { username } = useParams();
    const [dropdownToggle, setDropdownToggle] = useState(false);
    const currentUser = useAppSelector(selectCurrentUser);

    const { checkAccessToken } = useCheck();
    const [avatarToggle, setAvatarToggle] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const formData = new FormData();

    async function avatarUploadHandle(eventTarget: HTMLInputElement) {

        if (eventTarget.files) {

            await checkAccessToken();
            formData.append('file', eventTarget.files[0]);

            const updateResponse = await fetch(`/api/files/${currentUser?.id}/avatar`, {
                method: "PUT",
                body: formData
            });
            const updateData = await updateResponse.json();
            console.log(updateData);

            const getResponse = await fetch(`/api/users/${currentUser?.id}`);
            const getData = await getResponse.json();
            dispatch(setUser(getData));

        }

    }

    return (
        <div className='relative'>
            <div className="w-full bg-white p-5 flex gap-[50px] items-center">
                <div className="flex gap-5 items-center max-w-[600px] mx-auto md:ml-[200px] lg:ml-[350px] lg:mr-auto">
                    <div>
                        <h2 className="text-sky-600 font-semibold text-lg">{thisUser?.name} {thisUser?.surname}</h2>
                        <p className="text-zinc-400 text-sm-14">Singer-songwriter</p>
                    </div>
                    <div className='hidden md:flex md:items-center md:gap-[20px]'>
                        <NavLink to={"/" + username + "/home"}>
                            {({ isActive }) => {
                                return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Timeline</p>
                            }}
                        </NavLink>
                        <NavLink to={"/" + username + "/photos"}>
                            {({ isActive }) => {
                                return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Photos</p>
                            }}
                        </NavLink>
                        <NavLink to={"/" + username + "/friends"}>
                            {({ isActive }) => {
                                return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Friends</p>
                            }}
                        </NavLink>
                        <NavLink to={"/" + username + "/messages"}>
                            {({ isActive }) => {
                                return <p className={"font-medium transition hover:text-sky-600 " + (isActive ? "text-sky-600" : "text-zinc-700")}>Messages</p>
                            }}
                        </NavLink>
                    </div>
                    <button className='w-10 h-10 grid place-items-center md:hidden text-xl text-zinc-400 relative'
                        onClick={() => setDropdownToggle(prev => !prev)}>
                        <TfiMenu />
                        <div className={'absolute w-[100px] bg-sky-600 top-[60px] ' + (dropdownToggle ? "block" : "hidden")}>
                            <Link to={"/" + username + "/home/"}>
                                <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Timeline</p>
                            </Link>
                            <Link to={"/" + username + "/photos"}>
                                <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Photos</p>
                            </Link>
                            <Link to={"/" + username + "/friends"}>
                                <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Friends</p>
                            </Link>
                            {
                                currentUser && (currentUser.username === username ?
                                    <Link to={"/" + username + "/messages"}>
                                        <p className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">Messages</p>
                                    </Link> : "")
                            }
                        </div>
                    </button>
                </div>
            </div>
            <div
                onMouseEnter={() => setAvatarToggle(true)} onMouseLeave={() => setAvatarToggle(false)}
                className="shadow-sm shadow-zinc-300 w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[190px] lg:h-[190px] bg-white rounded-full grid place-items-center absolute top-[-90px] left-[35%] sm:left-[40%] md:top-[-60px] md:left-[70px] lg:top-[-130px] lg:left-[150px]">
                <img
                    src={"/api/public" + thisUser?.avatar}
                    className="rounded-full object-cover object-top w-20 h-20 
                    md:w-[120px] md:h-[120px] lg:w-[170px] lg:h-[170px] relative"
                    alt="user" />
                <label
                    htmlFor="avatar"
                    className={`p-[5px] transition bg-sky-800/30 hover:bg-sky-600/90 rounded-md text-sm-13 
                    text-bold text-white backdrop-blur-md absolute top-[120px] ${avatarToggle ? "opacity-100" : "opacity-0"}`}>
                    Set Avatar
                </label>
                <input onChange={(event) => {
                    const eventTarget = event.target as HTMLInputElement;
                    avatarUploadHandle(eventTarget);
                }} type="file" id='avatar' className='hidden' />
            </div>
        </div>
    )
}
