import { IPost, IReaction, IUser } from "./../../types";
import AvatarDisplay from "./AvatarDisplay";
import CommentList from "./CommentList";
import Likes from "./Likes";
import CommentBar from "./../forms/CommentBar";
import { imageUrl, url } from "../../utils/enviromentConfig";
import { useEffect, useState } from "react";

export default function Post({ postData, user, status }: { postData: IPost, user?: IUser | null, status?: string }) {

	const [likes, setLikes] = useState<IReaction[] | undefined>();
	const [dislikes, setDislikes] = useState<IReaction[] | undefined>();

	useEffect(() => {

		fetch(`${url}/reactions/?post_id=${postData.id}&type=like`)
			.then(res => res.json())
			.then(data => setLikes(data));

		fetch(`${url}/reactions/?post_id=${postData.id}&type=dislike`)
			.then(res => res.json())
			.then(data => setDislikes(data));

	}, [])

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
									return <img key={item.id} src={imageUrl + item.path} alt="post"></img>
								}
							}
						)
					}
					<Likes
						likes={likes as IReaction[]}
						dislikes={dislikes as IReaction[]}
						commentAmount={postData.comments.length}
						post={postData}
						setLikes={setLikes}
						setDislikes={setDislikes}
					/>
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
