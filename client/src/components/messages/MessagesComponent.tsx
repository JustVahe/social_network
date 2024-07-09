import { TfiBell } from "react-icons/tfi";
import MessageContainer from "./MessageContainer";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectRooms, setRooms, undefineRooms } from "../../redux/slices/roomsSlice";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useEffect, useState } from "react";
import { url } from "../../utils/enviromentConfig";
import { FaMessage } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import ModalWindow from "../shared/ModalWindow";

export default function MessagesComponent() {

	const rooms = useAppSelector(selectRooms);
	const currentUser = useAppSelector(selectCurrentUser);

	const [modalType, setModalType] = useState<string | boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(undefineRooms());
		fetch(`${url}/rooms?user_id=` + currentUser?.id)
			.then(res => res.json())
			.then(data => {
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
				modalType && <ModalWindow type={modalType} setModalType={setModalType} />
			}
			{
				rooms ? (
					rooms.length === 0 ? <div className="w-full flex justify-between items-center">
						<p className="italic text-sm-14 text-zinc-400">You haven't started chat with someone yet</p>
						<div className="flex gap-[10px]">
							<button
								onClick={() => setModalType("create_group_chat")}
								className="w-[160px] rounded-md bg-sky-600 text-white text-sm-13 p-[5px] flex justify-between items-center transition hover:bg-sky-700">
								Create Group Chat <FaMessage />
							</button>
							<button 
								onClick={() => setModalType("explore")}
								className="w-[160px] bg-sky-600 text-white rounded-md text-sm-13 p-[5px] flex justify-between items-center transition hover:bg-sky-700">
								Find Someone <FaSearch />
							</button>
						</div>

					</div> : <MessageContainer />
				) :
					<div className="w-full">
						<svg xmlns="http://www.w3.org/2000/svg" className="animate-spin w-[30px] h-[30px] text-zinc-700" viewBox="0 0 512 512">
							<path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 
							0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 
							0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
						</svg>
					</div>
			}
		</div>
	)
}
