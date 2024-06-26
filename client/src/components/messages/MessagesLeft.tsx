import { v4 } from "uuid";
import MessageLabel from "./MessageLabel";
import { useAppSelector } from "../../redux/typedHooks";
import { selectRooms } from "../../redux/slices/roomsSlice";

export default function MessagesLeft() {

	const rooms = useAppSelector(selectRooms);

	return (
		<div className="col-span-5 sm:col-span-2 xl:col-span-1 border-r border-r-slate-200 flex flex-col">
			{
				rooms && rooms.map((item) => <MessageLabel room={item} key={v4()} />)
			}
		</div>
	)
}
