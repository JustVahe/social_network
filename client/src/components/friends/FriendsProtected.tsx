import FriendLabel from "../feed/FriendLabel"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { selectUsersFriends, setUsersFriends } from "../../redux/slices/usersFriends";
import { url } from "../../utils/enviromentConfig";
import Loading from "../shared/Loading";

export default function FriendsProtected() {
    const usersFriends = useAppSelector(selectUsersFriends);
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentUser?.id) {
            fetch(`${url}/friends/` + currentUser?.id)
                .then((response) => response.json())
                .then((data) => {
                    dispatch(setUsersFriends(data));
                }
                );
        }

    }, [currentUser?.id, dispatch]);

    return (
        <div className="xl:sticky xl:top-[70px] sm:relative w-full p-[20px] px-[25px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[590px] flex flex-grow flex-col">
            <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Friends</p>
            <input type="text" className="w-full p-[5px] text-sm-13 border border-gray-200 mt-[20px] outline-none" placeholder="Search contacts" />
            <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col mt-[20px] gap-5">
                {
                    usersFriends ? (
                        usersFriends.length !== 0 ? usersFriends.map((item) => <FriendLabel friend={item.user_b} key={item.id} />) :
                            <p className=" italic text-zinc-500 text-sm-14">This user has no friends yet...</p>
                    ) : <div className="w-full">
                        <Loading />
                    </div>
                }
            </div>
        </div>
    )
}
