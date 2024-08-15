import PostingForm from "../forms/PostingForm";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedFeedComponent from "../feed/ProtectedFeedComponent";
import ProtectedShortcuts from "../menu/ProtectedShortcuts";
import FriendsProtected from "../friends/FriendsProtected";
import { useEffect, useState } from "react";

export default function ProtectedUserFeed() {

    const currentUser = useAppSelector(selectCurrentUser);
    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setPageWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (pageWidth <= 1280) {
        return (<div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <ProtectedShortcuts />
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <PostingForm />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <FriendsProtected />
                    <ProtectedFeedComponent />
                </div>
            </div>
        </div>)
    }

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
                    <FriendsProtected />
                </div>
            </div>
        </div>
    )
}