import { IUser } from "../../types";
import FriendButton from "../buttons/FriendButton";

export default function MessageUser({user} : {user : IUser}) {

    return (
      <div className="w-full border-b border-b-slate-200 flex p-[10px] items-center gap-[10px]">
         <FriendButton status={user.status} src={user.avatar} /> 
         <p className="text-sm-13 text-zinc-700">{user.name} {user.surname}</p>
      </div>
    )
}
