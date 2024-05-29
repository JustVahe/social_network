import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectUsers, setUsers } from "../../redux/slices/userSlice";
import { IUser } from "../../types";
import FriendsRow from "./FriendsRow";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

export default function FriendsComponent() {

    const {id} = useParams();
    const dispatch = useAppDispatch();

    const [friendsToggle, setFriendsToggle] = useState("friends");

    useEffect(() => {
        fetch("/api/api/users")
        .then((res) =>{ 
          return res.json()
        })
        .then(data => {
            dispatch(setUsers(data));
        })
    }, [dispatch])

    const users = useAppSelector(selectUsers);

    const friends : IUser[] = [];
    const requests : IUser[] = [];

    users.find(item => item.id === id)?.friends.forEach(friendID => {
        const friend = users.find(item => item.id === friendID);
        if (friend) {
          friends.push(friend);
        }
      })

    users.find(item => item.id === id)?.requests.forEach(friendID => {
      const request = users.find(item => item.id === friendID);
      if (request) {
        requests.push(request);
      }
    })

    return (
        <div className="w-full bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
            <div className="w-full flex gap-10">
                <button className="flex gap-[10px]" onClick={() => setFriendsToggle("friends")}>
                  <p className={`text-sm-14  font-medium ${friendsToggle === "friends" ? "after:block after:w-full text-sky-600 after:h-0.5 after:bg-sky-600" : "text-zinc-700"} `}>My Friends</p>
                  <p className="bg-slate-50 border-zinc-200 border rounded-md text-sm-13 p-[5px] leading-3 text-zinc-400">{friends.length}</p>
                </button>
                <button className="flex gap-[10px]" onClick={() => setFriendsToggle("requests")}>
                  <p className={`text-sm-14  font-medium ${friendsToggle === "requests" ? "after:block after:w-full text-sky-600 after:h-0.5 after:bg-sky-600" : ""} `}>Requests</p>
                  <p className="bg-slate-50 border-zinc-200 border rounded-md text-sm-13 p-[5px] leading-3 text-zinc-400">1</p>
                </button>
            </div>
            {friendsToggle === "friends" ? 
                <div className="flex flex-col gap-[15px] mt-[15px]">
                    {friends.map(item => <FriendsRow type="friend" item={item} key={v4()} />)}
                </div> : 
                <div className="flex flex-col gap-[15px] mt-[15px]">
                    {requests.map(item => <FriendsRow type="request" item={item} key={v4()} />)}
                </div>
            }
        </div>
    )
}
