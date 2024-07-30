import Post from "../post/Post";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useEffect } from "react";
import { selectCurrrentUsersPosts, setCurrentUsersPosts } from "../../redux/slices/currentUser'sPostsSlice";
import { url } from "../../utils/enviromentConfig";
import Loading from "../shared/Loading";
import { api } from "../../axios/axios";

export default function ProtectedFeedComponent() {

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const currentUsersPosts = useAppSelector(selectCurrrentUsersPosts);

    useEffect(() => {
        api.get(`${url}/post/?user_id=` + currentUser?.id).then((response) => dispatch(setCurrentUsersPosts(response.data.data)));
        // eslint-disable-next-line
    }, [])

    return (
        <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
            {(currentUsersPosts) ? (
                currentUsersPosts.length !== 0 ?
                    currentUsersPosts.map(item => <Post postData={item} key={item.id} user={currentUser} status="protected" />)
                    : <div>This user has no posts yet</div>
            ) : <div className="w-full"><Loading /></div>
            }
        </div>
    )
}
