import { useAppDispatch } from "../../redux/typedHooks";
import Post from "./post/Post";
import { ID, IPost } from "../../types";
import { useEffect, useState } from "react";

export default function DashboardFeed({ id }: { id?: ID }) {


  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<IPost[] | null>();

  useEffect(() => {
    fetch("/api/posts/")
      .then((res) => res.json())
      .then(data => {
        setPosts(data);
      })
  }, [dispatch, id])

  return (
    <div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
      {
        posts && posts.map(item => <Post postData={item} key={item.id} />)
      }
    </div>
  )
}