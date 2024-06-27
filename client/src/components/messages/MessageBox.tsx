import { useEffect, useRef, useState } from "react";
import MessageSendingBar from "../forms/MessageBar";
import Message from "./Message";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectRoom, setRoom } from "../../redux/slices/roomSlice";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { notifySuccess } from "../../utils/toastification";
import { deleteRoom, selectRooms } from "../../redux/slices/roomsSlice";

export default function MessageBox() {

	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);
	const room = useAppSelector(selectRoom);
	const rooms = useAppSelector(selectRooms);
	const messageBoxRef = useRef(null);
	const [optionsToggle, setOptionsToggle] = useState<boolean>();

	useEffect(() => {

		if (room?.id) {
			fetch("/api/rooms/" + room.id)
				.then(res => res.json())
				.then(data => {
					dispatch(setRoom(data))
				});
		}

		//eslint-disable-next-line
	}, [room?.id]);

	useEffect(() => {

		const current = (messageBoxRef.current as unknown) as Element;

		if (current && current.lastElementChild) {
			current.lastElementChild.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		}

	}, [room?.messages]);

	const roomDeleteHandler = async () => {

		if (room && rooms) {
			if (room.chat) {
				const chatDeleteData = await (await fetch("/api/connections/" + room.id, { method: "DELETE" })).json();
				notifySuccess(chatDeleteData);
				dispatch(deleteRoom(room));
				dispatch(setRoom(rooms[0]));
			} else {
				const roomDeleteData = await (await fetch("/api/rooms/" + room.id, { method: "DELETE" })).json();
				notifySuccess(roomDeleteData);
				dispatch(deleteRoom(room));
				dispatch(setRoom(rooms[0]));
			}

		}

	}

	return (
		room &&
		<div className="mt-6 sm:mt-0 col-span-5 sm:col-span-3 xl:col-span-4 relative">
			{
				optionsToggle && <div className="w-[150px] z-50 bg-zinc-100 rounded-md border border-zinc-300 absolute top-[-15px] right-[45px]">
					<button
						onClick={() => roomDeleteHandler()}
						className="p-2.5 w-full rounded-md text-red-600 text-sm-14 transition hover:bg-red-600 hover:text-white">Delete Chat</button>
				</div>
			}
			<div className="w-full absolute top-0 flex gap-[15px] p-2.5 pt-0 border-b border-b-slate-200">
				{room.user_b ?
					<div className="flex justify-between w-full items-center">
						<div className="flex gap-[10px]">
							<img src={"/api/public" + room.user_b.avatar} alt="message_to_this_user" className="w-[45px] h-[45px] object-cover object-top" />
							<div>
								<Link to={`/${room.user_b.username}/home`}>
									<p className="text-sm-14 font-bold text-zinc-700">{room.user_b.name} {room.user_b.surname}</p>
								</Link>
								<p className="text-sm-14 font-light text-zinc-700">online</p>
							</div>
						</div>
						<button onClick={() => setOptionsToggle(prev => !prev)}>
							{!optionsToggle ? <FaEllipsisV /> : <FaX />}
						</button>
					</div>
					: <div className="flex justify-between w-full items-center">
						<div className="flex gap-[10px]">
							<img src={"/api/public" + room.chat.avatar} alt="message_to_this_user" className="w-[45px] h-45px] object-cover object-top" />
							<div>
								<p className="text-sm-14 font-bold text-zinc-700">{room.chat.name}</p>
								<p className="text-sm-14 font-light text-zinc-700">{room.chat.connections?.length}</p>
							</div>
						</div>
						<button onClick={() => setOptionsToggle(prev => !prev)}>
							{!optionsToggle ? <FaEllipsisV /> : <FaX />}
						</button>
					</div>}
			</div>
			<div ref={messageBoxRef} className="mt-[60px] p-[10px] h-[350px] overflow-x-hidden overflow-y-auto">
				{(room.messages && room.messages.length !== 0) ?
					room.messages.map((item, index) => {
						return <Message
							key={index}
							align={item.from_id === currentUser?.id ? "right" : "left"}
							message={item} />
					})
					: <p className="text-sm-14 text-white w-[270px] padding-[5px] bg-zinc-400 rounded-sm mx-auto text-center">
						This chat has no messages yet...
					</p>
				}
			</div>
			<MessageSendingBar />
		</div>
	)
}
