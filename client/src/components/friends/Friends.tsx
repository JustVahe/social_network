import FriendLabel from "../feed/FriendLabel"
import { IUser } from "../../types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectThisUsersFriends, setThisUsersFriends } from "../../redux/slices/thisUsersFriends";

export default function Friends({ user }: { user: IUser }) {

    const friends = useAppSelector(selectThisUsersFriends);
    const dispatch = useAppDispatch();

    const url = import.meta.env.VITE_URL;

    useEffect(() => {
        if (user.id) {
          fetch(`${url}/friends/` + user.id)
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setThisUsersFriends(data));
                });
        }


    }, [user.id, user.friends, dispatch]);

    return (
        <div className="xl:sticky xl:top-[70px] sm:relative w-full p-[20px] px-[25px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[590px] flex flex-grow flex-col">
            <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Friends</p>
            <input type="text" className="w-full p-[5px] text-sm-13 border border-gray-200 mt-[20px] outline-none" placeholder="Search contacts" />
            <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col mt-[20px] gap-5">
                {
                    (friends && friends.length) ? friends.map((item) => <FriendLabel friend={item.user_b} key={item.id} />) : <p className=" italic text-zinc-500 text-sm-14">This user has no friends yet...</p>
                }
            </div>
        </div>
    )
}
