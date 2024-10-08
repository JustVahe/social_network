import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import FriendsRow from "./FriendsRow";
import { IFriend, IRequest, IUser } from "../../types";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import RequestRow from "./RequestRow";
import { url } from "../../utils/enviromentConfig";
import Loading from "../shared/Loading";
import { api } from "../../axios/axios";

export default function FriendsComponent({ user }: { user: IUser }) {
	const [friends, setFriends] = useState<IFriend[] | undefined>();
	const [requestsFromMe, setRequestsFromMe] = useState<IRequest[] | undefined>();
	const [requestsToMe, setRequestsToMe] = useState<IRequest[] | undefined>();
	const currentUser = useAppSelector(selectCurrentUser);
	const dispatch = useAppDispatch();

	const [friendsToggle, setFriendsToggle] = useState("friends");
	const [requestToggle, setRequestToggle] = useState<"from_me" | "to_me">("from_me");

	useEffect(() => {
		api.get(`${url}/friends/` + user.id)
			.then(res => {
				setFriends(res.data);
			})

		api.get(`${url}/requests/?user_id=` + user.id + "&toggle=from_me&status=pending")
			.then(res => {
				setRequestsFromMe(res.data);
			})

		api.get(`${url}/requests/?user_id=` + user.id + "&toggle=to_me&status=pending")
			.then(res => {
				setRequestsToMe(res.data)
			})

		//eslint-disable-next-line
	}, [dispatch, user.id])

	return (
		<div className="w-full bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
			<div className="w-full flex gap-10">
				<button className="flex gap-[10px]" onClick={() => setFriendsToggle("friends")}>
					<p className={`text-sm-14  font-medium ${friendsToggle === "friends" ? "after:block after:w-full text-sky-600 after:h-0.5 after:bg-sky-600" : "text-zinc-700"} `}>Friends</p>
					<p className="bg-slate-50 border-zinc-200 border rounded-md text-sm-13 p-[5px] leading-3 text-zinc-400">{friends && friends.length}</p>
				</button>
				{user.id === currentUser?.id ? <button className="flex gap-[10px]" onClick={() => setFriendsToggle("requests")}>
					<p className={`text-sm-14  font-medium ${friendsToggle === "requests" ? "after:block after:w-full text-sky-600 after:h-0.5 after:bg-sky-600" : ""} `}>Requests</p>
					<p className="bg-slate-50 border-zinc-200 border rounded-md text-sm-13 p-[5px] leading-3 text-zinc-400">{(requestsFromMe && requestsToMe) && requestsFromMe.length + requestsToMe.length}</p>
				</button> : ""}
			</div>
			{friendsToggle === "friends" ?
				<div className="flex flex-col gap-[15px] mt-[15px]">
					{
						friends ? (
							friends.length !== 0 ? friends.map(item => <FriendsRow item={item} key={item.id} setFriends={setFriends} outerUser={user} />)
								: <div className="text-sm-14 text-zinc-400 italic">This user has no friends yet</div>
						) : <div className="w-full">
							<Loading />
						</div>
					}
				</div> :
				<div className="flex flex-col gap-[15px] mt-[15px]">
					<div className="w-full p-[10px] flex gap-5">
						<button
							onClick={() => setRequestToggle("from_me")}
							className={`text-sm-14 text-zinc-700 ${requestToggle === "from_me" ? "after:block after:w-[50px] after:absolute after:p-[1px] after:bg-sky-600" : ""
								}`}>
							From me
						</button>
						<button
							onClick={() => setRequestToggle("to_me")}
							className={`text-sm-14 text-zinc-700 ${requestToggle === "to_me" ? "after:block after:w-[40px] after:absolute after:p-[1px] after:bg-sky-600" : ""
								}`}>
							To me
						</button>
					</div>
					{
						requestToggle === "from_me" ?
							(
								requestsFromMe ? (
									requestsFromMe.length !== 0 ?
										requestsFromMe.map(item =>
											<RequestRow
												item={item}
												key={item.id}
												type="from"
												setFriends={setFriends}
												setRequests={setRequestsFromMe}
											/>)
										: <p className="text-sm-14 text-zinc-400 italic">There's no requests from you now...</p>
								) : <div className="w-full">
									<Loading />
								</div>
							)
							: (requestsToMe ?
								(requestsToMe.length !== 0 ?
									requestsToMe.map(item =>
										<RequestRow
											item={item}
											key={item.id}
											type="to"
											setFriends={setFriends}
											setRequests={setRequestsToMe} />)
									: <p className="text-sm-14 text-zinc-400 italic">There's no requests addressed to you you now...</p>
								) : <div className="w-full">
									<Loading />
								</div>
							)
					}
				</div>
			}
		</div>
	)
}
