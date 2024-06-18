import FriendLabel from "../feed/FriendLabel"
import { ID, IFriend } from "../../types";
import { useEffect, useState } from "react";

export default function Friends({ id }: { id: ID }) {

    const [friends, setFriends] = useState<IFriend[] | undefined>();

    useEffect(() => {
        if (id) {
            fetch("/api/friends/"+ id)
                .then((response) => response.json())
                .then((data) => {
                    setFriends(data);
                }
            );
        }
    }, [id]);

    return (
        <div className="xl:sticky xl:top-[70px] sm:relative w-full p-[20px] px-[25px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[590px] flex flex-grow flex-col">
            <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Friends</p>
            <input type="text" className="w-full p-[5px] text-sm-13 border border-gray-200 mt-[20px] outline-none" placeholder="Search contacts" />
            <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col mt-[20px] gap-5">
                {
                    (friends && friends.length !== 0) ? friends.map((item) => {
                        return <FriendLabel friend={item.user_b} key={item.id} />
                    }) : <p className=" italic text-zinc-500 text-sm-14">You have no friends yet...</p>
                }
            </div>
        </div>
    )
}

// onChange={(event) => searchHandler(event)}
