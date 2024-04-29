import { v4 } from "uuid";
import { IPost } from "../../../types";
import AvatarDisplay from "./AvatarDisplay";
import CommentList from "./CommentList";
import Likes from "./Likes";

export default function Post({postData} : {postData : IPost}) {
  return (
    <div className="w-full flex flex-col gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
        <AvatarDisplay user={postData.user} />
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
          commentAmount : postData.comments.length
        }} />
        <p className="text-sm-14 text-zinc-400">
          {postData.message}
        </p>
        <CommentList comments={postData.comments} />
    </div>
  )
}
