import { setMessagesOfTheRoom, setRoom } from "../../redux/slices/roomSlice";
import { useAppDispatch } from "../../redux/typedHooks";
import { IRoom, IConnection } from "../../types";
import { imageUrl, url } from "../../utils/enviromentConfig";
import FriendButton from "../buttons/FriendButton";

export default function MessageLabel({ room }: { room: IRoom & IConnection }) {

	const dispatch = useAppDispatch();

	return (
		<button onClick={() => {

			fetch(`${url}/messages/?room_id=` + room?.id)
				.then(res => res.json())
				.then(data => {
					dispatch(setMessagesOfTheRoom(data))
				});

			dispatch(setRoom(room));
			
		}}>
			{room.user_b ? <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
				<FriendButton status={room.user_b.status} src={imageUrl + room.user_b.avatar} />
				<p className="text-sm-13 text-zinc-700">{room.user_b.name} {room.user_b.surname}</p>
			</div> : <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
				<FriendButton src={imageUrl + room.chat.avatar} />
				<p className="text-sm-13 text-zinc-700 w-[60%]">{room.chat.name}</p>
			</div>
			}
		</button>

	)
}
