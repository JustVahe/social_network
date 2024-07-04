import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'
import { TfiMenu } from 'react-icons/tfi';
import { useEffect, useState } from 'react';
import { ID, IFriend, IRequest, IUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { selectCurrentUser } from '../../redux/slices/currentUserSlice';
import Unfriend from '../friends/friendButtons/Unfriend';
import PendingFriend from '../friends/friendButtons/PendingFriend';
import AddFriend from '../friends/friendButtons/AddFriend';
import { useHandlers } from '../../utils/hooks/handlers';
import { FaMessage } from 'react-icons/fa6';
import { setRoom } from '../../redux/slices/roomSlice';
import { addRoom } from '../../redux/slices/roomsSlice';
import { url } from '../../utils/enviromentConfig';
import { deleteFriendOfCurrrentUser } from '../../redux/slices/usersFriends';
import { deleteFriendOfThisUser } from '../../redux/slices/thisUsersFriends';

export default function UserNavbar({ thisUser }: { thisUser: IUser }) {

    const { username } = useParams();
    const navigate = useNavigate();

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const [dropdownToggle, setDropdownToggle] = useState(false);
    const [request, setRequest] = useState<IRequest>();
    const [friend, setFriend] = useState<IFriend>();

    const { friendRequestAddingHandler, unfriendHandler } = useHandlers();

    useEffect(() => {

        fetch(`${url}/requests/` + currentUser?.id, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                target_id: thisUser.id
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setRequest(data);
                console.log({ data, thisUser: thisUser.id });
            });

        fetch(`${url}/friends?user_id=${currentUser?.id}&target_id=${thisUser.id}`)
            .then(response => response.json())
            .then(data => {
                setFriend(data);
            })

    }, [thisUser.id, currentUser?.id]);

    return (
        <div className='relative'>
            <div className="w-full bg-white p-5 flex gap-[50px] items-center">
                <div className="flex gap-5 items-center max-w-[900px] mx-auto md:ml-[200px] lg:ml-[350px] lg:mr-auto">
                    <div>
                        <h2 className="text-sky-600 font-semibold text-lg">{thisUser?.name} {thisUser?.surname}</h2>
                        <p className="text-zinc-400 text-sm-14">{thisUser?.description}</p>
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
                    </div>
                    {
                        request?.status === "approved" ? <Unfriend setFriend={setFriend} friend={friend as IFriend} /> :
                            request?.status === "pending" ? <PendingFriend />
                                : <AddFriend from={currentUser as IUser} to={thisUser} setRequest={setRequest} />
                    }
                    <button
                        onClick={async () => {

                            const findRoom = await ((await fetch(`${url}/rooms?user_id=${currentUser?.id}&target_id=${thisUser.id}`))).json();

                            if (thisUser.id) {
                                if (!findRoom) {
                                    const roomData = await (await fetch(`${url}/rooms`, {
                                        method: "POST",
                                        headers: {
                                            "Content-type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            user_a_id: currentUser?.id,
                                            user_b_id: thisUser.id
                                        })
                                    })).json();

                                    dispatch(addRoom(roomData));
                                    dispatch(setRoom(roomData));
                                } else {
                                    dispatch(setRoom(findRoom));
                                }
                            }

                            navigate("/dashboard/messages");

                        }}
                        className="hidden md:flex md:gap-[10px] w-[200px] md:items-center 
                                md:justify-center md:p-[5px] md:transition md:text-white 
                                md:font-bold md:rounded-md md:bg-sky-600">
                        Send Message <FaMessage />
                    </button>
                    <div className='w-10 h-10 grid place-items-center md:hidden text-xl text-zinc-400 relative'
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
                                (request?.status === "approved" && friend) ?
                                    <button
                                        onClick={() => {
                                            unfriendHandler(friend.id as string);
                                            setFriend(undefined);
                                            dispatch(deleteFriendOfCurrrentUser(friend));
                                            dispatch(deleteFriendOfThisUser(friend));
                                        }}
                                        className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">
                                        Unfriend
                                    </button>
                                    : request?.status === "pending" ?
                                        <button className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">
                                            Waiting for response
                                        </button>
                                        : !request ? <button onClick={() => friendRequestAddingHandler(currentUser?.id as ID, thisUser.id)}
                                            className="text-white p-2.5 font-medium text-md transition hover:bg-zinc-50 hover:bg-opacity-25">
                                            Add Friend
                                        </button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="shadow-sm shadow-zinc-300 w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[190px] lg:h-[190px] bg-white rounded-full grid place-items-center absolute top-[-90px] left-[35%] sm:left-[40%] md:top-[-60px] md:left-[70px] lg:top-[-130px] lg:left-[150px]">
                <img
                    src={`${url}/public` + thisUser?.avatar}
                    className="rounded-full object-cover object-top w-20 h-20 
                    md:w-[120px] md:h-[120px] lg:w-[170px] lg:h-[170px] relative"
                    alt="avatar" />
            </div>
        </div>
    )
}
