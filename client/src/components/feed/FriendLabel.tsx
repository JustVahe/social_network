import { IUser } from "../../types";
import FriendButton from "../buttons/FriendButton";

export default function FriendLabel({friend} : {friend : IUser}) {

    const {name,surname,avatar,status,email} = friend;
    
    return (
      <div className="w-full flex gap-[15px]">
          <FriendButton status={status} src={"/api/public/"+avatar} />
          <div>
              <p className="text-sm-12 font-bold">{name} {surname}</p>
              <p className="text-sm-11">{email}</p>
          </div>
      </div>
    )
}
