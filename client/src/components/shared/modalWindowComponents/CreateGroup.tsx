import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../redux/typedHooks";
import { selectCurrentUser } from "../../../redux/slices/currentUserSlice";
import { IFriend } from "../../../types";
import { notifyError } from "../../../utils/toastification";
import { addRoom } from "../../../redux/slices/roomsSlice";
import { url } from "../../../utils/enviromentConfig";
import { api } from "../../../axios/axios";

export default function CreateGroup({ setModalType }: { setModalType?: React.Dispatch<React.SetStateAction<string | boolean>> }) {

    const [friends, setFriends] = useState<IFriend[] | undefined>();
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const [selectedList, setSelectedList] = useState<boolean[]>();
    const [name, setName] = useState("");

    useEffect(() => {
        api.get(`${url}/friends/` + currentUser?.id)
            .then(res => {
                setFriends(res.data);
                setSelectedList(new Array(res.data.length).fill(false));
            });
    }, [currentUser?.id]);

    const groupCreationHandler = async () => {

        if (selectedList && friends && setModalType) {
            if (selectedList.filter(item => item).length < 2)
                return notifyError("You haven't selected enough friends");

            if (name && name.trim().length !== 0) {

                const chatData = (await api.post(`${url}/chats/`, { name })).data;

                selectedList.forEach(async (item, index) => {
                    if (item) {
                        await api.post(`${url}/connections/`, {
                            chat_id: chatData.id,
                            user_id: friends[index].user_b.id
                        });
                    }
                })

                const connectionData = await (await api.post(`${url}/connections/`, {
                    chat_id: chatData.id,
                    user_id: currentUser?.id
                })).data;

                dispatch(addRoom(connectionData));
                setModalType(false);

            } else {
                return notifyError("Please write name of your chat");
            }
        }
    }

    return (
        setModalType &&
        <div className="pointer-events-auto
            relative top-[100px] left-0 flex flex-col flex-grow
            right-0 mx-auto w-[300px] sm:w-[400px] bg-[#fdfdfd] rounded-md">
            <button onClick={() => setModalType(false)} className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 transition hover:bg-sky-600">
                <FaX />
            </button>
            <div className="w-full bg-sky-600 p-0.5 rounded-t-md"></div>
            <div className="p-2.5">
                <h1 className="text-2xl text-zinc-800 text-center font-bold mt-10">Create Group</h1>
                <p className="text-sm text-center text-zinc-500">Select at least 3 users to form a group</p>
            </div>
            <div className="p-2.5">
                <input
                    onChange={(event) => {
                        const eventTarget = event.target as HTMLInputElement;
                        setName(eventTarget.value);
                    }}
                    type="text"
                    placeholder="Input the name of the group"
                    className="w-full p-[10px] shadow-sm shadow-zinc-700/40 border border-zinc-300 rounded-md outline-none 
                placeholder:text-zinc-400 placeholder:text-sm-14" />
            </div>
            <div className="p-2.5 flex flex-col flex-grow ">
                {friends && (
                    <>
                        <div className="h-[400px]">
                            {friends.length !== 0 ? <div className="flex flex-col gap-2.5">
                                {friends.map((item, index) => <div key={index} className="flex gap-[10px]">
                                    <label htmlFor={index.toString()} className="block w-full">
                                        <div className="w-full bg-zinc-100 shadow-sm shadow-zinc-700/40 p-2.5">
                                            {item.user_b.name}
                                        </div>
                                    </label>
                                    <input
                                        className="block"
                                        type="checkbox"
                                        onChange={() => {
                                            setSelectedList(state => {
                                                if (state) {
                                                    const toChange = !state[index];
                                                    state.splice(index, 1, toChange);
                                                    return state;
                                                }
                                            });
                                        }}
                                        id={index.toString()}></input>
                                </div>)}
                            </div>
                                : <p className="w-full text-zinc-400 italic text-sm-14">
                                    You don't have friends yet, get some to create group chat
                                </p>}
                        </div>
                        <button
                            onClick={() => groupCreationHandler()}
                            className="w-full p-2.5 bg-sky-600 rounded-md text-white font-bold">Create
                        </button>
                    </>
                )}
            </div >
        </div >
    )
}
