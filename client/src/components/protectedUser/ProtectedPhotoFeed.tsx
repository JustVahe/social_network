import { useCheck } from "../../utils/hooks/useCheck";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedShortcuts from "../menu/ProtectedShortcuts";
import ProtectedPhotoComponent from "./ProtectedPhotoComponent";
import FriendsProtected from "../friends/FriendsProtected";

export default function ProtectedPhotoFeed() {

    const { checkAccessToken } = useCheck();
    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {
        checkAccessToken();
        //eslint-disable-next-line
    }, []);

    return (
        currentUser &&
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <ProtectedShortcuts />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <ProtectedPhotoComponent />
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <FriendsProtected />
                </div>
            </div>
        </div>
    )
}