import { TfiBell } from "react-icons/tfi";
import MessageContainer from "./MessageContainer";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectRooms, setRooms } from "../../redux/slices/roomsSlice";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useEffect } from "react";
import { setRoom } from "../../redux/slices/roomSlice";

export default function MessagesComponent() {

	const rooms = useAppSelector(selectRooms);
	const currentUser = useAppSelector(selectCurrentUser);

	const dispatch = useAppDispatch();

	const url = import.meta.env.VITE_URL;

	useEffect(() => {
		fetch(`${url}/rooms?user_id=` + currentUser?.id)
			.then(res => res.json())
			.then(data => {
				dispatch(setRoom(data[0]))
				dispatch(setRooms(data));
			})
		//elint-disble-next-line
	}, [currentUser?.id, dispatch]);

	return (
		<div className="w-full gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
			<p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600 mb-[25px]">
				<span className="text-sky-600 float-left mr-[5px]">
					<TfiBell />
				</span>
				All Messages
			</p>
			
			{
				(!rooms || rooms.length === 0) ? <div className="italic text-sm-14 text-zinc-400">
					You haven't started chat with someone yet
				</div> : <MessageContainer />
			}
		</div>
	)
}
