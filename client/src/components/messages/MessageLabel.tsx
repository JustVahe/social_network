import { io, Socket } from "socket.io-client";
import { api } from "../../axios/axios";
import { setMessagesOfTheRoom, setRoom } from "../../redux/slices/roomSlice";
import { useAppDispatch } from "../../redux/typedHooks";
import { IRoom, IConnection } from "../../types";
import { imageUrl, url } from "../../utils/enviromentConfig";
import FriendButton from "../buttons/FriendButton";
import Loading from "../shared/Loading";
import { useState } from "react";

export default function MessageLabel({ room }: { room: IRoom & IConnection }) {

	const dispatch = useAppDispatch();
	const [socket, setSocket] = useState<Socket | null>(null);

	const clickHandler = () => {
		api.get(`${url}/messages/?room_id=` + room?.id)
			.then(res => {
				dispatch(setMessagesOfTheRoom(res.data))
			});

		dispatch(setRoom(room));
		setSocket(io(url));

		if (socket) {
			if (room?.chat) {
				socket.emit("join_chat", room.chat_id);
			} else {
				socket.emit("join_room", room.id);
			}
		}
	}

	return (
		<button onClick={clickHandler}>
			{room.user_b ? <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
				<FriendButton status={room.user_b.status} src={imageUrl + room.user_b.avatar} />
				<p className="text-sm-13 text-zinc-700">{room.user_b.name} {room.user_b.surname}</p>
			</div> : room.chat ? <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
				<FriendButton src={imageUrl + room.chat.avatar} />
				<p className="text-sm-13 text-zinc-700 w-[60%]">{room.chat.name}</p>
			</div> : <Loading />}
		</button>
	)
}
