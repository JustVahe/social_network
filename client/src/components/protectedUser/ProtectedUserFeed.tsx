import Friends from "../friends/Friends";
import PostingForm from "../forms/PostingForm";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedFeedComponent from "../feed/ProtectedFeedComponent";
import ProtectedShortcuts from "../menu/ProtectedShortcuts";
import { useHandlers } from "../../utils/hooks/handlers";

export default function ProtectedUserFeed() {

    const currentUser = useAppSelector(selectCurrentUser);
    const { sortHandler } = useHandlers();

    useEffect(() => {

        sortHandler();
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
                    <PostingForm />
                    <ProtectedFeedComponent />
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Friends id={currentUser.id} />
                </div>
            </div>
        </div>
    )
}