import { IPost, IReaction, IUser } from "./../../types";
import AvatarDisplay from "./AvatarDisplay";
import CommentList from "./CommentList";
import Likes from "./Likes";
import CommentBar from "./../forms/CommentBar";
import { imageUrl, url } from "../../utils/enviromentConfig";
import { useEffect, useState } from "react";
import { api } from "../../axios/axios";

export default function Post({ postData, user, status }: { postData: IPost, user?: IUser | null, status?: string }) {

	const [likes, setLikes] = useState<IReaction[] | undefined>();
	const [dislikes, setDislikes] = useState<IReaction[] | undefined>();

	useEffect(() => {
		api.get(`${url}/reactions/?post_id=${postData.id}&type=like`).then(response => setLikes(response.data));
		api.get(`${url}/reactions/?post_id=${postData.id}&type=dislike`).then(response => setDislikes(response.data));
		//eslint-disable-next-line
	}, []);

	return (
		<div className="w-full flex flex-col gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
			{
				postData ?
					<>
						<AvatarDisplay user={user ? user : postData.user} status={status} post={postData} />
						{
							postData.files ? postData.files.map(item => {
								if (item.type === "image") return <img key={item.id} src={imageUrl + item.path} alt="post"></img>
							}) : <div className="w-full h-[300px] bg-zinc-600 rounded-md">
								<div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
							</div>
						}
						<Likes
							likes={likes as IReaction[]}
							dislikes={dislikes as IReaction[]}
							commentAmount={postData.comments ? postData.comments.length : 0}
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
					: <>
						<div className="flex justify-between">
							<div className="w-[30px] h-[30px] bg-zinc-600 rounded-full">
								<div className='w-full h-full bg-zinc-400 animate-pulse rounded-full'></div>
							</div>
							<div className="w-[90%] h-[30px] bg-zinc-600 rounded-md">
								<div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
							</div>
						</div>
						<div className="w-full h-[300px] bg-zinc-600 rounded-md">
							<div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
						</div>
						<div className="w-full h-[50px] bg-zinc-600 rounded-md">
							<div className='w-full h-full bg-zinc-400 animate-pulse rounded-md'></div>
						</div>
					</>
			}
		</div>
	)
}
