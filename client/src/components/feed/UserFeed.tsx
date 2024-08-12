import Friends from "../friends/Friends";
import NewsfeedComponent from "../feed/NewsfeedComponent";
import Shortcuts from "../menu/Shortcuts";
import { useEffect } from "react";
import { useCheck } from "../../utils/hooks/useCheck";
import { useAppSelector } from "../../redux/typedHooks";
import { selectThisUser } from "../../redux/slices/thisUserSlice";

export default function UserFeed() {

    const { checkAccessToken } = useCheck();
    const thisUser = useAppSelector(selectThisUser);

    useEffect(() => {
        checkAccessToken();
        //eslint-disable-next-line
    }, []);

    return (
        thisUser &&
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Shortcuts user={thisUser} />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <NewsfeedComponent id={thisUser.id} />
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Friends user={thisUser} />
                </div>
            </div>
        </div>
    )
}