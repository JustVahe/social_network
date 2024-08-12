import Post from "../post/Post";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { addPosts, selectPost, setPost } from "../../redux/slices/postSlice";
import PostLoading from "../post/PostLoading";
import Loading from "../shared/Loading";
import { url } from "../../utils/enviromentConfig";
import { api } from "../../axios/axios";

export default function HomeFeed() {

    const posts = useAppSelector(selectPost);
    const dispatch = useAppDispatch();
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
        const observableItem = document.querySelector("#loader_div");
        postObserver.observe(observableItem as Element);
    }

    useEffect(() => {
        api.get(`${url}/post/?limit=${5}&offset=${0}`).then(response => dispatch(setPost(response.data)));
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (offset !== 0) {
            api.get(`${url}/post/?limit=${5}&offset=${offset}`).then(response => dispatch(addPosts(response.data)));
        }
        //eslint-disable-next-line
    }, [offset]);

    useEffect(() => {
        infiniteHandler();
        //eslint-disable-next-line
    }, [])

    return (
        <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
            {posts ? (
                    posts.length !== 0 ? posts.map(item => <Post postData={item} key={item.id} />) : <div>
                        There are no posts yet
                    </div>
                ) : <div className="w-full">
                    <Loading />
                </div>
            }
            <PostLoading />
        </div >
    )
}