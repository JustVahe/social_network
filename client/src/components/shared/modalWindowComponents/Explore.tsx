import { ChangeEvent, useState } from "react";
import { FaMessage, FaX } from "react-icons/fa6";
import { imageUrl, url } from "../../../utils/enviromentConfig";
import { IUser } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/typedHooks";
import { selectCurrentUser } from "../../../redux/slices/currentUserSlice";
import { setRoom } from "../../../redux/slices/roomSlice";
import { addRoom } from "../../../redux/slices/roomsSlice";
import { api } from "../../../axios/axios";

export default function Explore({ setModalType }: { setModalType?: React.Dispatch<React.SetStateAction<string | boolean>> }) {

    const [users, setUsers] = useState<IUser[] | undefined>();

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const changeHandler = async (event: ChangeEvent) => {
        const eventTarget = event.target as HTMLInputElement;
        if (eventTarget.value?.trim().length != 0) {
            const searchResponse = await api.get(`${url}/users?filter=name&value=` + eventTarget.value.toLowerCase());
            const searchData = await searchResponse.data;
            setUsers(searchData);
        } else {
            setUsers(undefined);
        }
    }

    const messageAdddingHandler = async (thisUser: IUser) => {

        const findRoom = await ((await api.get(`${url}/rooms/?user_id=${currentUser?.id}&target_id=${thisUser.id}`))).data;

        if (!findRoom) {

            const roomData = (await api.post(`${url}/rooms`, {
                user_a_id: currentUser?.id,
                user_b_id: thisUser.id
            })).data;

            dispatch(addRoom(roomData));
            dispatch(setRoom(roomData));
        } else {
            dispatch(setRoom(findRoom));
        }

        if (setModalType) {
            setModalType(false);
        }

    }

    return (
        <div className="pointer-events-auto
            relative top-[100px] left-0 flex flex-col flex-grow
            right-0 mx-auto w-[300px] sm:w-[400px] bg-[#fdfdfd] rounded-md">
            {setModalType && <button onClick={() => setModalType(false)} className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 transition hover:bg-sky-600">
                <FaX />
            </button>}
            <div className="w-full bg-sky-600 p-0.5 rounded-t-md"></div>
            <div className="p-2.5">
                <h1 className="text-2xl text-zinc-800 text-center font-bold mt-10">Explore</h1>
            </div>
            <div className="p-2.5">
                <input
                    onChange={changeHandler}
                    type="text"
                    placeholder="Search Users 🔍"
                    className="w-full p-[10px] shadow-sm shadow-zinc-700/40 border border-zinc-300 rounded-md outline-none 
                placeholder:text-zinc-400 placeholder:text-sm-14" />
                <div className="w-full h-[300px] flex flex-col p-2.5 gap-2.5">
                    {users ? users.map(item => <div className="w-ful flex justify-between items-center">
                        <div className="flex gap-2.5 items-center">
                            <img src={imageUrl + item.avatar} alt="user_avatar" className="w-[40px] h-[40px] object-cover object-center" />
                            <div>
                                <p className="text-zinc-700 font-bold text-sm-13">{item.name + " " + item.surname}</p>
                                <p className="text-sm-13 text-zinc-700">@{item.username}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => messageAdddingHandler(item)}
                            className="w-[100px] bg-sky-600 rounded-md p-[5px] text-sm-13 flex gap-2.5 items-center justify-center text-white">Message <FaMessage /></button>
                    </div>) : ""}
                </div>
            </div>
        </div>
    )
}