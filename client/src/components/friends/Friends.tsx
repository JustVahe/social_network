import FriendLabel from "../feed/FriendLabel"
import { v4 } from "uuid"
import { useAppSelector } from "../../redux/typedHooks"
import { selectUsers } from "../../redux/slices/userSlice"
import { IUser } from "../../types";
import { useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";

export default function Friends() {

  const {id} = useParams();

  const users = useAppSelector(selectUsers);
  const currentUser = users.find(item => item.id === id);
  const friends : IUser[] = [];

  const [currentFriends, setCurrentFriends] = useState<IUser[]>();

  currentUser?.friends.forEach(friendID => {
    const friend = users.find(item => item.id === friendID);
    if (friend) {
      friends.push(friend);
    }
  })

  const searchHandler = (event: ChangeEvent) => {

    const searchTarget = event.target as HTMLInputElement;
    const searchValue = searchTarget.value;
    
    setCurrentFriends(friends.filter(friend => [...searchValue].every(item => [...friend.name,...friend.surname].includes(item))))

  }

  return (
    <div className="xl:sticky xl:top-[70px] sm:relative w-full p-[20px] px-[25px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[590px] flex flex-grow flex-col">
        <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Friends</p>
        <input onChange={(event) => searchHandler(event)} type="text" className="w-full p-[5px] text-sm-13 border border-gray-200 mt-[20px] outline-none" placeholder="Search contacts" />
        <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col mt-[20px] gap-5">
            {
                currentFriends ? currentFriends.map(item => {
                    return <FriendLabel friend={item} key={v4()} />
                }) : friends ? friends.map(item => {
                  return <FriendLabel friend={item} key={v4()} />
              }) : ""
            }
        </div>
    </div>
  )
}
