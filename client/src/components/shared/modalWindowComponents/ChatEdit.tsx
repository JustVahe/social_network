import { FaX } from "react-icons/fa6";
import { selectRoom } from "../../../redux/slices/roomSlice";
import { useAppSelector } from "../../../redux/typedHooks"
import { useEffect, useState } from "react";
import { IChat } from "../../../types";
import { notifyError, notifySuccess } from "../../../utils/toastification";
import { FaImage } from "react-icons/fa";
import { imageUrl, url } from "../../../utils/enviromentConfig";

export default function ChatEdit({ setModalType }: { setModalType?: React.Dispatch<React.SetStateAction<string | boolean>> }) {

    const room = useAppSelector(selectRoom);

    const [chat, setChat] = useState<IChat | undefined>();
    const [name, setName] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [avatarButtonToggle, setAvatarButtonToggle] = useState<boolean>(false);

    const avatar = new FormData();
    useEffect(() => {

        fetch(`${url}/chats/` + room?.chat_id)
            .then(res => res.json())
            .then(data => setChat(data));

    }, [room?.chat_id]);

    const chatUpdateHandler = async () => {

        if (chat && setModalType) {

            const chatUpdateResponse = await fetch(`${url}/chats/` + chat?.id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name, description
                })
            });

            if (chatUpdateResponse.status === 200) {
                notifySuccess("Chat is successfully updated");
                setModalType(false);
            } else {
                notifyError("Something went wrong");
            }

        }

    }

    const avatarUpdateHandler = async (eventTarget: HTMLInputElement) => {

        if (chat && eventTarget.files) {

            avatar.append('file', eventTarget.files[0]);

            const updateResponse = await fetch(`${url}/chats/avatar/` + chat.id, {
                method: "PUT",
                body: avatar
            });
            const updateData = await updateResponse.json();

            if (updateResponse.status !== 200) {
                notifyError(updateData);
            } else {
                notifySuccess(updateData);
            }

            const chatData = await fetch(`${url}/chats/` + room?.chat_id).then(res => res.json());
            setChat(chatData);

        }

    }

    return (
        <div className="pointer-events-auto
            relative top-[100px] left-0 flex flex-col flex-grow
            right-0 mx-auto w-[300px] sm:w-[400px] bg-[#fdfdfd] rounded-md">
            {setModalType && <button onClick={() => setModalType(false)}
                className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 
                transition hover:bg-sky-600">
                <FaX />
            </button>}
            <div className="w-full bg-sky-600 p-0.5 rounded-t-md"></div>
            <div className="p-2.5">
                <h1 className="text-2xl text-zinc-800 text-center font-bold mt-10">Group Details</h1>
            </div>
            {
                chat && <div className="w-full flex flex-col gap-2.5 p-2.5">
                    <div className="w-full p-[5px] bg-sky-600 transition text-white hover:bg-sky-700 rounded-sm shadow-sm shadow-zinc-700/45">
                        <span className="font-bold mr-2.5">Name:</span>
                        <input
                            onChange={(event) => {
                                const eventTarget = event.target as HTMLInputElement;
                                setName(eventTarget.value);
                            }}
                            type="text"
                            className="border-none outline-none p-0 bg-sky-600 transition w-[70%] hover:bg-sky-700"
                            defaultValue={chat.name} />
                    </div>
                    <div className="w-full p-[5px] flex flex-start bg-sky-600 transition text-white hover:bg-sky-700 rounded-sm shadow-sm shadow-zinc-700/45">
                        <span className="font-bold mr-2.5">Description:</span>
                        <textarea
                            onClick={(event) => {
                                const eventTarget = event.target as HTMLTextAreaElement;
                                setDescription(eventTarget.value);
                            }}
                            className="border-none outline-none p-0 bg-sky-600 transition w-[70%] hover:bg-sky-700"
                            defaultValue={chat.description} />
                    </div>
                    <div className="w-full flex items-start">
                        <div
                            onMouseEnter={() => setAvatarButtonToggle(true)}
                            onMouseLeave={() => setAvatarButtonToggle(false)}
                            className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]  relative">
                            <label
                                htmlFor="chat_avatar"
                                className={`absolute w-[200px] flex items-center justify-center gap-2.5 top-[240px] text-center rounded-md text-white left-0 right-0 
                                mx-auto p-[5px] bg-zinc-800/75 backdrop-blur-md transition hover:bg-sky-600/90 ${avatarButtonToggle ? "opacity-100" : "opacity-0"}`}>
                                Set Chat Avatar <FaImage />
                            </label>
                            <input
                                onChange={(event) => {
                                    const eventTarget = event.target as HTMLInputElement;
                                    avatarUpdateHandler(eventTarget);
                                }}
                                type="file"
                                name="file"
                                id="chat_avatar"
                                className="hidden" />
                            <img src={imageUrl + chat.avatar} alt="avatar" className="object-cover w-full h-full" />
                        </div>
                    </div>
                </div>
            }
            <button
                onClick={() => chatUpdateHandler()}
                className="w-full p-2.5 bg-sky-600 transition hover:bg-sky-700 text-white rounded-b-md">
                Edit Chat
            </button>
        </div>
    )
}
