import { setMessagesOfTheRoom, setRoom } from "../../redux/slices/roomSlice";
import { useAppDispatch } from "../../redux/typedHooks";
import { IRoom } from "../../types";
import FriendButton from "../buttons/FriendButton";

export default function MessageLabel({ room }: { room: IRoom }) {

	const dispatch = useAppDispatch();

	return (
		<button onClick={() => {

			fetch("/api/messages/?room_id=" + room?.id)
				.then(res => res.json())
				.then(data => {
					dispatch(setMessagesOfTheRoom(data))
				});

			dispatch(setRoom(room));
		}}>
			{room.user_b ? <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
				<FriendButton status={room.user_b.status} src={"/api/public" + room.user_b.avatar} />
				<p className="text-sm-13 text-zinc-700">{room.user_b.name} {room.user_b.surname}</p>
			</div> : <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
				<FriendButton src={"/api/public" + room.avatar} />
				<p className="text-sm-13 text-zinc-700">{room.name}</p>
			</div>
			}
		</button>

	)
}
