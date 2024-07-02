import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { deleteFriendOfCurrrentUser } from "../../redux/slices/usersFriends";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { IFriend, IUser } from "../../types";
import { useHandlers } from "../../utils/hooks/handlers";

export default function FriendsRow({ item, setFriends, outerUser }:
    {
        item: IFriend,
        setFriends: React.Dispatch<React.SetStateAction<IFriend[] | undefined>>,
        outerUser: IUser
    }) {

    const user = item.user_b;
    const { unfriendHandler } = useHandlers();
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch  = useAppDispatch();

    return (
        <div className="bg-white p-5 flex justify-between border border-slate-100">
            <div className="flex gap-[20px]">
                <img src={"/api/public/" + user.avatar} alt={user.username} className="w-[60px] h-[60px] object-top object-cover" />
                <div className="flex flex-col gap-[10px]">
                    <p className="text-md text-zinc-700 font-medium">{user.name} {user.surname}</p>
                    <p className="text-sm-14 text-sky-600 font-bold">@{user.username}</p>
                </div>
            </div>
            <div
                className="flex gap-[10px] items-center">
                {
                    currentUser?.id === outerUser.id && <button
                        onClick={() => {
                            unfriendHandler(item.id as string);
                            setFriends(prev => (prev || []).filter(state => state.id !== item.id));
                            dispatch(deleteFriendOfCurrrentUser(item));
                        }}
                        className="bg-zinc-500 p-[5px] text-white text-sm-13 rounded-md">Unfriend</button>
                }
            </div>
        </div>
    )
}
