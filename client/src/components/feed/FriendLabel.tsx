import { IFriend } from "../../types";
import FriendButton from "../buttons/FriendButton";

export default function FriendLabel({friend} : {friend : IFriend}) {

    const {name,surname,email,imageSrc,status} = friend;

  return (
    <div className="w-full flex gap-[15px]">
        <FriendButton status={status} src={imageSrc} />
        <div>
            <p className="text-sm-12 font-bold">{name} {surname}</p>
            <p className="text-sm-11">{email}</p>
        </div>
    </div>
  )
}
