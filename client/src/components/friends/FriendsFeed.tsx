import Friends from "./Friends";
import Shortcuts from "../menu/Shortcuts";
import FriendsComponent from "./FriendsComponent";
import { IUser } from "../../types";
import FriendsProtected from "./FriendsProtected";

export default function FriendsFeed({ user, status }: { user: IUser, status?: string }) {

    return (
        user &&
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Shortcuts user={user} />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <FriendsComponent user={user} />
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    {status === "protected" ? <FriendsProtected /> : <Friends user={user} />}
                </div>
            </div>
        </div>
    )
}