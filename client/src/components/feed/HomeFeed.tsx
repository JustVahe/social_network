import Post from "../post/Post";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { addPosts, selectPost, setPost } from "../../redux/slices/postSlice";
import PostLoading from "../post/PostLoading";

export default function HomeFeed() {

    const posts = useAppSelector(selectPost);
    const dispatch = useAppDispatch();

    const url = import.meta.env.VITE_URL

    const [offset, setOffset] = useState(0);

    const postObserver = new IntersectionObserver((entries) => {
        const loadingPost = entries[0];
        if (!loadingPost.isIntersecting) {
            return;
        } else {
            setOffset(prev => prev + 5)
            return;
        }
    })

    const infiniteHandler = () => {

        console.log("handler called");

        const observableItem = document.querySelector("#loader_div");
        postObserver.observe(observableItem as Element);

    }

    useEffect(() => {
        fetch(`${url}/posts/?limit=${5}&offset=${0}`)
            .then((res) => res.json())
            .then(data => {
                dispatch(setPost(data));
            })
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (offset !== 0) {
            fetch(`${url}/posts/?limit=${5}&offset=${offset}`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(addPosts(data));
                })
        }

        //eslint-disable-next-line
    }, [offset]);

    useEffect(() => {
        infiniteHandler();
        console.log("effect");
        //eslint-disable-next-line
    }, [])

    return (
        <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
            {posts && Array.isArray(posts) && posts.map(item => <Post postData={item} key={item.id} />)}
            <PostLoading />
        </div >
    )
}