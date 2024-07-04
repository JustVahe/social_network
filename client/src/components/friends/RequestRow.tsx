import { addFriendToCurrentUser, setUsersFriends } from "../../redux/slices/usersFriends";
import { useAppDispatch } from "../../redux/typedHooks";
import { IFriend, IRequest, IUser } from "../../types";
import { useHandlers } from "../../utils/hooks/handlers";

interface IParams { 
    item: IRequest,
    type: "from" | "to",
    setFriends: React.Dispatch<React.SetStateAction<IFriend[] | undefined>>,
    setRequests: React.Dispatch<React.SetStateAction<IRequest[] | undefined>>
}

export default function FriendsRow({ item, type, setFriends, setRequests }: IParams) {
    const { friendAddingHandler, requestDeclineHandler } = useHandlers();
    const user: IUser = type === "from" ? item.to : item.from;
    const dispatch = useAppDispatch();

    const url = import.meta.env.VITE_URL;

    return (
        user &&
        <div className="bg-white p-5 flex justify-between border border-slate-100">
            <div className="flex gap-[20px]">
                <img src={`${url}/public/` + user.avatar} alt={user.username} className="w-[60px] h-[60px] object-top object-cover" />
                <div className="flex flex-col gap-[10px]">
                    <p className="text-md text-zinc-700 font-medium">{user.name} {user.surname}</p>
                    <p className="text-sm-14 text-sky-600 font-bold">@{user.username}</p>
                </div>
            </div>
            {
                type === "to" && <div className="flex gap-[10px] items-center">
                    <button
                        onClick={async () => {
                                await requestDeclineHandler(item.id);
                                fetch(`${url}/requests/` + item.id + "?toggle=to_me&status=pending")
                                    .then((res) => {
                                        return res.json()
                                    })
                                    .then(data => {
                                        setRequests(data);
                                        dispatch(setUsersFriends(data));
                                    })
                        }}
                        className="bg-zinc-500 p-[5px] text-white text-sm-13 rounded-md">
                        Decline
                    </button>
                    <button
                        onClick={async () => {
                            const friend = await friendAddingHandler(item.id as string)
                            setFriends((prev) => [...prev as IFriend[], friend]);
                            setRequests((prev) => {
                                if (prev) {
                                    const findIndex = prev?.findIndex(state => state.id === item.id);
                                    prev.splice(findIndex, 1);
                                    return prev;
                                }
                            })
                            dispatch(addFriendToCurrentUser(friend));
                        }}
                        className="bg-sky-600 p-[5px] text-white text-sm-13 rounded-md">
                        Confirm
                    </button>
                </div>
            }
        </div>
    )
}
