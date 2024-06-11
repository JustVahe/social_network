import Post from "./post/Post";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectPost, setPost } from "../../redux/slices/postSlice";

export default function HomeFeed() {

    const posts = useAppSelector(selectPost);
    const dispatch = useAppDispatch();

    useEffect(() => {

        fetch("/api/posts/")
            .then((res) => res.json())
            .then(data => {
                dispatch(setPost(data));
            })

    }, [dispatch]);

    return (
        <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
            {
                posts && posts.map(item => <Post postData={item} key={item.id} />)
            }
        </div>
    )
}