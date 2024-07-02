import { FaX } from "react-icons/fa6";
import { selectRoom } from "../../../redux/slices/roomSlice";
import { useAppSelector } from "../../../redux/typedHooks"
import { useEffect, useState } from "react";
import { IChat } from "../../../types";

export default function ChatDetails({ setModalType }: {
    setModalType?: React.Dispatch<React.SetStateAction<string | boolean>>
}) {

    const room = useAppSelector(selectRoom);
    const [chat, setChat] = useState<IChat | undefined>();

    useEffect(() => {

        fetch("/api/chats/" + room?.chat_id)
            .then(res => res.json())
            .then(data => setChat(data));

    }, [room?.chat_id]);

    return (
        <div className="pointer-events-auto
            relative top-[100px] left-0 flex flex-col flex-grow
            right-0 mx-auto w-[300px] sm:w-[400px] bg-[#fdfdfd] rounded-md">
            {setModalType && <button onClick={() => setModalType(false)} className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 transition hover:bg-sky-600">
                <FaX />
            </button>}
            <div className="w-full bg-sky-600 p-0.5 rounded-t-md"></div>
            <div className="p-2.5">
                <h1 className="text-2xl text-zinc-800 text-center font-bold mt-10">Group Details</h1>
            </div>
            {
                chat && <div className="w-full flex flex-col gap-2.5 p-2.5">
                    <div className="w-full p-[5px] bg-sky-600 transition text-white hover:bg-sky-700 rounded-sm shadow-sm shadow-zinc-700/45">
                        <span className="font-bold mr-2.5">Name:</span> {chat.name}
                    </div>
                    <div className="w-full p-[5px] bg-sky-600 transition text-white hover:bg-sky-700 rounded-sm shadow-sm shadow-zinc-700/45">
                        <span className="font-bold mr-2.5">Description:</span> {chat.description}
                    </div>
                    <div className="w-full flex items-start">
                        <div className="w-[100px] h-[100px]">
                            <img src={"/api/public" + chat.avatar} alt="avatar" className="object-cover w-full h-full" />
                        </div>
                        <div className="w-full flex flex-col gap-2.5 p-2.5">
                            <h4 className="font-bold text-sm">Users:</h4>
                            {
                                chat.connections && chat.connections.map((item, index) =>
                                    <div key={index} className="w-full bg-zinc-100 shadow rounded-md flex gap-2.5 shadow-zinc-700/30 p-2.5">
                                        <img
                                            src={"/api/public" + item.user.avatar}
                                            alt="user"
                                            className="w-[30px] h-[30px] rounded-full object-cover" />
                                        <div className="text-sm-13">
                                            <p className="font-bold">{item.user.name} {item.user.surname}</p>
                                            <p className="font-light">{item.user.username}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
            {setModalType && <button
                onClick={() => setModalType("chat_edit")}
                className="w-full p-2.5 bg-sky-600 transition hover:bg-sky-700 text-white rounded-b-md">
                Edit Users
            </button>}
        </div>
    )
}
