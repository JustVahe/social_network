import { v4 } from "uuid";
import MessageLabel from "./MessageLabel";
import { useAppSelector } from "../../redux/typedHooks";
import { selectRooms } from "../../redux/slices/roomsSlice";
import { FaChevronDown, FaPlus, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { FaMessage } from "react-icons/fa6";

export default function MessagesLeft() {

	const rooms = useAppSelector(selectRooms);
	const [chatToggle, setChatToggle] = useState<boolean>(false);

	return (
		<div className="col-span-5 sm:col-span-2 xl:col-span-1 flex-grow pr-2.5 border-r border-r-slate-200 flex flex-col">
			<div className="flex flex-col h-full">
				{rooms && rooms.map((item) => <MessageLabel room={item} key={v4()} />)}
			</div>
			<div
				className="w-full bg-zinc-700/60 flex flex-col rounded-md text-white p-[5px]">
				{
					chatToggle && <>
						<button className="w-full rounded-md text-sm-13 p-2.5 flex justify-between items-center transition hover:bg-sky-600/90">
							Create Group Chat <FaMessage />
						</button>
						<button className="w-full rounded-md text-sm-13 p-2.5 flex justify-between items-center transition hover:bg-sky-600/90">
							Find Someone <FaSearch />
						</button>
					</>
				}
				<button
					className="w-full rounded-md text-sm-13 p-2.5 flex justify-center items-center transition hover:bg-sky-600/90"
					onClick={() => setChatToggle(prev => !prev)}>
					{!chatToggle ? <FaPlus /> : <FaChevronDown />}
				</button>
			</div>
		</div>
	)
}
