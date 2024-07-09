import { Link } from "react-router-dom";
import { IUser } from "../../types";
import FriendButton from "../buttons/FriendButton";
import { imageUrl } from "../../utils/enviromentConfig";

export default function FriendLabel({ friend, setSearchToggle }: { friend: IUser, setSearchToggle?: React.Dispatch<React.SetStateAction<boolean>> }) {

    const { username, name, surname, avatar, status, email } = friend;

    return (
        <div className="w-full flex gap-[15px]">
            <FriendButton status={status} src={imageUrl + avatar} />
            <div>
                <Link to={`/${username}/home`}>
                    <p onClick={() => {
                        if (setSearchToggle) {
                            setSearchToggle(false)
                        }
                    }} className="text-sm-12 font-bold">{name} {surname}</p>
                </Link>
                <p className="text-sm-11">{email}</p>
            </div>
        </div>
    )
}
