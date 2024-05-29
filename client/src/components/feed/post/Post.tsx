import { IPost } from "../../../types";
import AvatarDisplay from "./AvatarDisplay";
import CommentList from "./CommentList";
import Likes from "./Likes";
import CommentBar from "../../forms/CommentBar";

export default function Post({postData} : {postData : IPost}) {

  const commentsOfThisPost = postData.comments;

  return (
    <div className="w-full flex flex-col gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
        <AvatarDisplay user={postData.user} />
        {/* {
          postData.files.map(
            item => {
              if (item.endsWith("jpg") || item.endsWith("png") || item.endsWith("svg") || item.endsWith("webp")) {
                return <img key={v4()} src={item}></img>
              }
            }
          )
        } */}
        <Likes stats={{
          likes : postData.likes,
          dislikes : postData.dislikes,
          commentAmount : commentsOfThisPost.length
        }} />
        <p className="text-sm-14 text-zinc-400">
          {postData.message}
        </p>
        <CommentList comments={commentsOfThisPost} />
        <CommentBar/>
    </div>
  )
}
