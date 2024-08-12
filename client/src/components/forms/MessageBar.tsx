import { FaPaperPlane } from "react-icons/fa";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { selectRoom } from "../../redux/slices/roomSlice";
import { useEffect, useState } from "react";
import { notifyError } from "../../utils/toastification";
import { IMessage } from "../../types";
import { url } from "../../utils/enviromentConfig";
import { api } from "../../axios/axios";
import { io, Socket } from "socket.io-client";

export default function MessageSendingBar({ setMessages }: {
	setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
}) {

	const [message, setMessage] = useState<string>("");
	const [ok, setOk] = useState(true);
	const [socket, setSocket] = useState<Socket | null>(null);

	const currentUser = useAppSelector(selectCurrentUser);
	const room = useAppSelector(selectRoom);

	const socketReceiveHandler = (data: IMessage) => {
		setMessages((messages) => [...messages, data]);
	}

	useEffect(() => {

		if (socket) {
			if (room?.chat) {
				socket.emit("join_chat", room.chat_id);
			} else {
				socket.emit("join_room", room?.id);
			}
		}

	}, [socket, room?.chat, room?.id, room?.chat_id]);

	useEffect(() => {

		const newSocket = io(url);
		setSocket(newSocket);

		newSocket.on("receive_message", socketReceiveHandler);

		return () => {
			if (newSocket) newSocket.disconnect();
		}

	}, []);

	const messageSendingHandler = async () => {

		if (message && message.trim().length !== 0) {

			const body = {
				from_id: currentUser?.id,
				message
			}

			console.log(room);

			if (room?.chat) {
				const messageData = (await api.post(`${url}/messages/?room_id=` + room?.chat?.id, body)).data;
				setMessages((messages) => {
					return [...messages, messageData];
				});
				if (socket && ok) {
					setOk(false);
					socket.emit("send_message_to_chat", messageData);
					setOk(true);
				}

				setMessage("");
			} else if (room) {
				const messageData = (await api.post(`${url}/messages/?room_id=` + room?.id, body)).data;
				setMessages((messages) => {
					return [...messages, messageData];
				});
				if (socket && ok) {
					setOk(false);
					socket.emit("send_message", messageData);
					setOk(true);
				}
				setMessage("");
			}

		} else {
			notifyError("Please write the message");
		}

	}

	return (
		<div className="w-full ml-2.5 flex justify-between items-center p-[10px] bg-sky-50 rounded-md border border-blue-100 shadow-sm shadow-zinc-300">
			<input
				onChange={(event) => {
					const eventTarget = event.target as HTMLInputElement;
					setMessage(eventTarget.value);
				}}
				value={message}
				type="text"
				className="w-[80%] bg-transparent p-[10px] outline-none placeholder:text-sky-800"
				placeholder="Send Message" />
			<button
				onClick={() => void messageSendingHandler()}
				className="p-[5px] bg-sky-600 text-white rounded-md flex items-center gap-[10px]">
				<FaPaperPlane /> Send
			</button>
		</div>
	)
}
