import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectUsers, setUsers } from "../../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { IUser } from "../../types";
import FriendButton from "../buttons/FriendButton";

export default function MenuRightFriends() {

  const dispatch = useAppDispatch();

  const {id} = useParams();

    useEffect(() => {
        fetch("http://localhost:8246/users")
        .then((res) =>{ 
          return res.json()
        })
        .then(data => {
            dispatch(setUsers(data));
        })
    }, [dispatch])

    const users = useAppSelector(selectUsers);
    const friends : IUser[] = [];

    users.find(item => item.id === id)?.friends.forEach(friendID => {
        const friend = users.find(item => item.id === friendID);
        if (friend) {
          friends.push(friend);
        }
      })
  
  return (
    <div className="hidden w-[70px] h-svh bg-white fixed top-0 right-0 z-10 shadow-xl shadow-zinc-300 lg:flex justify-center">
        <div className="mt-[90px] h-[570px] overflow-y-scroll no-scrollbar flex flex-col gap-[20px]">
          {
            friends && friends.map(item => {
               return <FriendButton src={item.avatar} status={item.status} key={v4()}/>
            })
          }
        </div>
    </div>
  )
}
