import { selectPost, setPost } from "../../redux/slices/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import Post from "./post/Post";
import { v4 } from "uuid";
import { ID } from "../../types";
import { useEffect } from "react";
import { selectUsers } from "../../redux/slices/userSlice";

export default function NewsfeedComponent({id} : {id?: ID}) {


  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPost);
  const users = useAppSelector(selectUsers);
  const currentUser = users.find(item => item.id === id);

  useEffect(() => {
    fetch("http://localhost:8246/posts?userId="+id)
    .then((res) => res.json())
        .then(data => {
            dispatch(setPost(data));
        })
  }, [dispatch, id])
  
  return (
    <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
      {
        posts && posts.map(item => <Post postData={item} key={v4()} avatar={currentUser?.avatar}/>)
      }
    </div>
  )
}
