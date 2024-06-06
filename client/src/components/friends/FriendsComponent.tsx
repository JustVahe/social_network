import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/typedHooks";
import FriendsRow from "./FriendsRow";
import { ID, IFriend } from "../../types";
import { useCheck } from "../../hooks/useCheck";

export default function FriendsComponent({ id }: { id: ID }) {


	const [friends, setFriends] = useState<IFriend[] | null>();
	const [requests, setRequests] = useState<IFriend[] | null>();

	const dispatch = useAppDispatch();

	const [friendsToggle, setFriendsToggle] = useState("friends");

	const { checkAccessToken } = useCheck();

	useEffect(() => {

		fetch("/api/friends/?status=approved&user_b_id=" + id)
			.then((res) => {
				return res.json()
			})
			.then(data => {
				setFriends(data);
			})

		fetch("/api/friends/?status=pending&user_b_id=" + id)
			.then((res) => {
				return res.json()
			})
			.then(data => {
				setRequests(data);
			})

	}, [dispatch, id, checkAccessToken])

	return (
		<div className="w-full bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
			<div className="w-full flex gap-10">
				<button className="flex gap-[10px]" onClick={() => setFriendsToggle("friends")}>
					<p className={`text-sm-14  font-medium ${friendsToggle === "friends" ? "after:block after:w-full text-sky-600 after:h-0.5 after:bg-sky-600" : "text-zinc-700"} `}>My Friends</p>
					<p className="bg-slate-50 border-zinc-200 border rounded-md text-sm-13 p-[5px] leading-3 text-zinc-400">{friends && friends.length}</p>
				</button>
				<button className="flex gap-[10px]" onClick={() => setFriendsToggle("requests")}>
					<p className={`text-sm-14  font-medium ${friendsToggle === "requests" ? "after:block after:w-full text-sky-600 after:h-0.5 after:bg-sky-600" : ""} `}>Requests</p>
					<p className="bg-slate-50 border-zinc-200 border rounded-md text-sm-13 p-[5px] leading-3 text-zinc-400">1</p>
				</button>
			</div>
			{friendsToggle === "friends" ?
				<div className="flex flex-col gap-[15px] mt-[15px]">
					{friends && friends.map(item => <FriendsRow type="friend" item={item.user_a} key={item.id} />)}
				</div> :
				<div className="flex flex-col gap-[15px] mt-[15px]">
					{requests && requests.map(item => <FriendsRow type="request" item={item.user_a} key={item.id} />)}
				</div>
			}
		</div>
	)
}
