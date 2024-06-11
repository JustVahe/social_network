import Friends from "../friends/Friends";
import Shortcuts from "../menu/Shortcuts";
import PostingForm from "../forms/PostingForm";
import { useEffect } from "react";
import { useCheck } from "../../hooks/useCheck";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedFeedComponent from "../feed/ProtectedFeedComponent";

export default function ProtectedUserFeed() {

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
                    <Shortcuts user={currentUser} />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <PostingForm />
                    <ProtectedFeedComponent/>
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Friends id={currentUser.id} />
                </div>
            </div>
        </div>
    )
}