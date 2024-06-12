import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { IPost, IUser } from "../../../types";
import { useAppDispatch } from "../../../redux/typedHooks";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { useCheck } from "../../../utils/hooks/useCheck";
import { deletePost, updatePost } from "../../../redux/slices/postSlice";
import { deletePostOfCurrentUser, updatePostOfCurrentUser } from "../../../redux/slices/currentUserSlice";

export default function AvatarDisplay({ user, status, post }: { user: IUser, status?: string, post?: IPost }) {

	const { checkAccessToken } = useCheck();
	const [optionsTogggle, setOptionsToggle] = useState<boolean>(false);
	const [updateToggle, setUpdateToggle] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<string | undefined>();
	const dispatch = useAppDispatch();

	const deleteHandler = async () => {
		
		await checkAccessToken();

		if (post) {

			const deleteRequest = await fetch("/api/posts/" + post.id, { method: "DELETE" });
			const data = await deleteRequest.json();
			console.log(data);

			dispatch(deletePost(post.id));
			dispatch(deletePostOfCurrentUser(post.id));
			setOptionsToggle(false);

			await checkAccessToken();

		}

	}

	const updateHandler = async () => {

		await checkAccessToken();

		if (post) {

			const updateResponse = await fetch("/api/posts/" + post.id, 
				{ 
					method: "PUT",
					headers: {
						"Content-Type" : "application/json"
					},
					body: JSON.stringify({
						message: newMessage
					})
				});
			
			const updateData = await updateResponse.json();

			const newPost = await (await fetch(`/api/posts/${updateData.id}`)).json();
			dispatch(updatePost(newPost));
			dispatch(updatePostOfCurrentUser(newPost));

			await checkAccessToken();

		}

	}

	return (
		user &&
		<div className="w-full flex items-center gap-[10px] relative">
			<img src={"/api/public" + user.avatar} alt="admin" className="w-[45px] h-[45px] object-cover object-top rounded-full" />
			<div>
				<p className="text-sm-14 font-bold text-sky-600">{
					user.name + " " + user.surname
				}</p>
				<p className="text-sm-11 text-zinc-400">Published: June,2 2018 19:PM</p>
			</div>
			{
				status === "protected" &&
				<button
					onClick={() => {
						setOptionsToggle(prev => !prev);
						setUpdateToggle(false);
					}}
					className="w-[20px] h-[20px] text-zinc-700 ml-auto">
					{
						optionsTogggle ? <FaX /> : <FaEllipsisV />
					}
				</button>
			}
			{
				optionsTogggle ?
					<div className="absolute top-[40px] right-[10px] w-[130px] flex flex-col bg-slate-50 border text-sm-13 border-slate-400">
						<button
							onClick={() => setUpdateToggle(prev => !prev)}
							className="w-full p-2.5 flex gap-[5px] items-center border-b border-slate-400 transition hover:bg-sky-600 hover:text-white">
							<FaEdit /> Edit Post
						</button>
						<button
							onClick={() => deleteHandler()}
							className="w-full p-2.5 flex gap-[5px] items-center transition hover:bg-sky-600 hover:text-white">
							<FaTrash /> Delete Post
						</button>
					</div> : ""
			}
			{
				updateToggle ?
					<div className="absolute p-[10px] top-[40px] right-[140px] w-[250px] flex items-start justify-between bg-slate-50 border text-sm-13 border-slate-400">
						<textarea
							onChange={(event) => {
								const eventTarget = event.target as HTMLTextAreaElement;
								setNewMessage(eventTarget.value);
							}}
							defaultValue={post?.message}
							className="w-[70%] h-[150px] resize-none border border-zinc-400 outline-none" />
						<button 
							onClick={updateHandler}
							className="w-[28%] bg-sky-600 rounded-md text-white">
							Update
						</button>
					</div> : ""
			}
		</div>
	)
}
