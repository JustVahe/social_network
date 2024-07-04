import { IPost, IUser } from "./../../types";
import AvatarDisplay from "./AvatarDisplay";
import CommentList from "./CommentList";
import Likes from "./Likes";
import CommentBar from "./../forms/CommentBar";
import { url } from "../../utils/enviromentConfig";

export default function Post({ postData, user, status }: { postData: IPost, user?: IUser, status?: string }) {

	return (
		<div className="w-full flex flex-col gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
			{
				postData &&
				<>
					<AvatarDisplay user={user ? user : postData.user} status={status} post={postData} />
					{
						postData.files.map(
							item => {
								if (item.type === "image") {
									return <img key={item.id} src={`${url}/public` + item.path} alt="post"></img>
								}
							}
						)
					}
					<Likes stats={{
						likes: postData.likes,
						dislikes: postData.dislikes,
						commentAmount: postData.comments.length
					}} />
					<p className="text-sm-14 text-zinc-400">
						{postData.message}
					</p>
					<CommentList comments={postData.comments} />
					<CommentBar postData={postData} />
				</>
			}
		</div>
	)
}
