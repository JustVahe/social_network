import { FaPaperPlane } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { addMessageToTheRoom, selectRoom } from "../../redux/slices/roomSlice";
import { useEffect, useState } from "react";
import { notifyError } from "../../utils/toastification";
import { IRoom } from "../../types";
import { getSocket } from "../../utils/hooks/socket";

export default function MessageSendingBar() {

	const currentUser = useAppSelector(selectCurrentUser);
	const [message, setMessage] = useState<string>("");
	const [approvedRoom, setApprovedRoom] = useState<IRoom | undefined>();
	const dispatch = useAppDispatch();
	const [socket] = useState(getSocket());
	const room = useAppSelector(selectRoom);

	useEffect(() => {	

		socket.emit("join_room", room);

		socket.on("receive_approved_room", (data : IRoom) => {
			setApprovedRoom(data);
		});

		socket.on("receive_message", (data) => {
			dispatch(addMessageToTheRoom(data));
		});

		//eslint-disable-next-line
	}, [socket, dispatch]);

	const messageSendingHandler = async () => {

		if (message && message.trim().length !== 0) {

			const body = {
				from_id: currentUser?.id,
				message
			}

			const messageData = await (
				await fetch("/api/messages/?room_id=" + approvedRoom?.id, {
					method: "POST",
					headers: {
						"Content-type" : "application/json"
					},
					body: JSON.stringify(body)
				})
			).json();

			const wholeMessageData = await(await fetch("/api/messages/"+messageData.id)).json();
			dispatch(addMessageToTheRoom(wholeMessageData));

			socket.emit("send_message", wholeMessageData);
			setMessage("");

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
				onClick={async () => await messageSendingHandler()}
				className="p-[5px] bg-sky-600 text-white rounded-md flex items-center gap-[10px]">
				<FaPaperPlane /> Send
			</button>
		</div>
	)
}
