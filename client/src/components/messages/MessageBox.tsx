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
import { IChat, IMessage } from "../../types";
import ModalWindow from "../shared/ModalWindow";

export default function MessageBox() {

	const dispatch = useAppDispatch();

	const currentUser = useAppSelector(selectCurrentUser);
	const room = useAppSelector(selectRoom);
	const rooms = useAppSelector(selectRooms);

	const messageBoxRef = useRef(null);
	const url = import.meta.env.VITE_URL;

	const [chat, setChat] = useState<IChat | undefined>();
	const [optionsToggle, setOptionsToggle] = useState<boolean>(false);
	const [modalType, setModalType] = useState<string | boolean>(false);
	const [messages, setMessages] = useState<IMessage[]>([]);

	useEffect(() => {

		if (room) {

			if (room.chat) {

				fetch(`${url}/chats/` + room.chat_id)
					.then(res => res.json())
					.then(data => {
						setChat(data);
					});

				fetch(`${url}/messages/?room_id=` + room.chat_id)
					.then(res => res.json())
					.then(data => {
						setMessages(data.sort((a: IMessage, b: IMessage) => {
							const aDate = new Date(a.createdAt)[Symbol.toPrimitive]("number");
							const bDate = new Date(b.createdAt)[Symbol.toPrimitive]("number");
							return aDate - bDate;
						}));
					})

			} else if (!room.chat_id && room?.id) {

				fetch(`${url}/messages/?room_id=` + room?.id)
					.then(res => res.json())
					.then(data => {
						setMessages(data.sort((a: IMessage, b: IMessage) => {
							const aDate = new Date(a.createdAt)[Symbol.toPrimitive]("number");
							const bDate = new Date(b.createdAt)[Symbol.toPrimitive]("number");
							return aDate - bDate;
						}));
					})

			}
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

	}, [messages]);

	const roomDeleteHandler = async () => {

		if (room && rooms) {
			if (room.chat && chat) {
				const chatDeleteData = await (await fetch(`${url}/connections/` + room.id, { method: "DELETE" })).json();
				if (chat.connections.length <= 3 ) {
					await fetch(`${url}/chats/`+chat.id , {method: "DELETE"});
				}
				notifySuccess(chatDeleteData);
				dispatch(deleteRoom(room));
				dispatch(setRoom(rooms[0]));
			} else {
				const roomDeleteData = await (await fetch(`${url}/rooms/` + room.id, { method: "DELETE" })).json();
				notifySuccess(roomDeleteData);
				dispatch(deleteRoom(room));
				dispatch(setRoom(rooms[0]));
			}

		}

	}

	const optionsToggleSetter = (type: string) => {
		setModalType(type);
		setOptionsToggle(false)
	}

	return (
		room &&
		<div className="mt-6 sm:mt-0 col-span-5 sm:col-span-3 xl:col-span-4 relative">
			{
				modalType && <ModalWindow type={modalType} setModalType={setModalType} />
			}
			{
				optionsToggle &&
				<div className="w-[150px] z-50 bg-zinc-100 rounded-md border border-zinc-300 absolute top-[-15px] right-[45px]">
					{
						room.chat && <>
							<button
								onClick={() => optionsToggleSetter("chat_details")}
								className="p-2.5 w-full rounded-md text-sky-600 text-sm-14 transition 
								hover:bg-sky-600 hover:text-white">Details</button>
							<button
								onClick={() => optionsToggleSetter("chat_edit")}
								className="p-2.5 w-full rounded-md text-sky-600 text-sm-14 transition 
								hover:bg-sky-600 hover:text-white">Edit Chat</button>
						</>
					}
					<button
						onClick={() => roomDeleteHandler()}
						className="p-2.5 w-full rounded-md text-red-600 text-sm-14 transition 
						hover:bg-red-600 hover:text-white">Delete Chat</button>
				</div>
			}
			<div className="w-full absolute top-0 flex gap-[15px] p-2.5 pt-0 border-b border-b-slate-200">
				{room.user_b ?
					<div className="flex justify-between w-full items-center">
						<div className="flex gap-[10px]">
							<img src={`${url}/public` + room.user_b.avatar} alt="message_to_this_user" className="w-[45px] h-[45px] object-cover object-top" />
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
					: room.chat ? <div className="flex justify-between w-full items-center">
						<div className="flex gap-[10px]">
							<img src={`${url}/public` + room.chat.avatar} alt="message_to_this_user" className="w-[45px] h-45px] object-cover object-top" />
							<div>
								<p className="text-sm-14 font-bold text-zinc-700">{room.chat.name}</p>
								<p className="text-sm-14 font-light text-zinc-700">{chat && chat.connections.length} users</p>
							</div>
						</div>
						<button onClick={() => setOptionsToggle(prev => !prev)}>
							{!optionsToggle ? <FaEllipsisV /> : <FaX />}
						</button>
					</div> : ""}
			</div>
			<div ref={messageBoxRef} className="mt-[60px] p-[10px] h-[350px] overflow-x-hidden overflow-y-auto">
				{
					messages.map((item, index) => <Message
						key={index}
						align={item.from_id === currentUser?.id ? "right" : "left"}
						message={item} />)
				}
			</div>
			<MessageSendingBar setMessages={setMessages} />
		</div>
	)
}