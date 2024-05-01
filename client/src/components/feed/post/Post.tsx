import { v4 } from "uuid";
import { IPost } from "../../../types";
import AvatarDisplay from "./AvatarDisplay";
import CommentList from "./CommentList";
import Likes from "./Likes";
import { useAppSelector } from "../../../redux/typedHooks";
import { selectComment } from "../../../redux/slices/commentSlice";

export default function Post({postData, avatar} : {postData : IPost, avatar : string | undefined}) {

  const comments = useAppSelector(selectComment);

  const commentsOfThisPost = comments.filter(item => item.postId === postData.id);

  return (
    <div className="w-full flex flex-col gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
        <AvatarDisplay avatar={avatar} />
        {
          postData.files.map(
            item => {
              if (item.endsWith("jpg") || item.endsWith("png") || item.endsWith("svg") || item.endsWith("webp")) {
                return <img key={v4()} src={item}></img>
              }
            }
          )
        }
        <Likes stats={{
          likes : postData.likes,
          watches : postData.watches,
          dislikes : postData.dislikes,
          commentAmount : commentsOfThisPost.length
        }} />
        <p className="text-sm-14 text-zinc-400">
          {postData.message}
        </p>
        <CommentList comments={commentsOfThisPost} />
    </div>
  )
}
