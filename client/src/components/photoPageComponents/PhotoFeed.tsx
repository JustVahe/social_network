import Friends from "../friends/Friends";
import Shortcuts from "../menu/Shortcuts";
import PhotoComponent from "./PhotoComponent";
import { IUser } from "../../types";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedShortcuts from "../menu/ProtectedShortcuts";

export default function PhotoFeed({ user, status }: { user: IUser, status: string }) {

    const currentUser = useAppSelector(selectCurrentUser);

    return (
        currentUser &&
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    {status === "protected" ? <ProtectedShortcuts /> : <Shortcuts user={currentUser} />}
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <PhotoComponent id={user.id}/>
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Friends user={user} />
                </div>
            </div>
        </div>
    )
}