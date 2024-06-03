import FriendLabel from "../feed/FriendLabel"
import { ID, IFriend } from "../../types";
import { useEffect, useState } from "react";

export default function Friends({ id }: { id: ID }) {

  const [friends, setFriends] = useState<IFriend[]>();

  useEffect(() => {
    if (id) {
      fetch("/api/friends/?status=approved&user_b_id=" + id)
        .then((response) => response.json())
        .then((data) => {
          setFriends(data);
        });
    }

  }, [id])


  return (
    <div className="xl:sticky xl:top-[70px] sm:relative w-full p-[20px] px-[25px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[590px] flex flex-grow flex-col">
      <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Friends</p>
      <input type="text" className="w-full p-[5px] text-sm-13 border border-gray-200 mt-[20px] outline-none" placeholder="Search contacts" />
      <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col mt-[20px] gap-5">
        {/* {
          currentFriends ? currentFriends.map(item => {
            return <FriendLabel friend={item} key={v4()} />
          }) : friends ? friends.map(item => {
            return <FriendLabel friend={item} key={v4()} />
          }) : ""
        } */}
        {
          friends && friends.map((item) => {
            return <FriendLabel friend={item.user_a} key={item.id} />
          })
        }
      </div>
    </div>
  )
}

// onChange={(event) => searchHandler(event)}
