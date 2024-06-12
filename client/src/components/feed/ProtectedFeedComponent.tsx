import Post from "./post/Post";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useCheck } from "../../utils/hooks/useCheck";
import { useEffect } from "react";

export default function ProtectedFeedComponent() {

    const { checkAccessToken } = useCheck();
    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {
        checkAccessToken();
        // eslint-disable-next-line
    }, [])


    return (
        <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
            {currentUser && currentUser.posts.map(item => <Post postData={item} key={item.id} user={currentUser} status="protected"/>)}
        </div>
    )
}
