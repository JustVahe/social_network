import { FaEdit, FaEllipsisV, FaTrash } from "react-icons/fa";
import { IPost, IUser } from "../../types";
import { useAppDispatch } from "../../redux/typedHooks";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { deletePost, updatePost } from "../../redux/slices/postSlice";
import { notifyError, notifyPromise } from "../../utils/toastification";
import { imageUrl, url } from "../../utils/enviromentConfig";
import { deletePostFromCurrentUsersPosts, updatePostFromCurrentUsersPosts } from "../../redux/slices/currentUser'sPostsSlice";
import { api } from "../../axios/axios";

export default function AvatarDisplay({ user, status, post }: { user: IUser, status?: string, post?: IPost }) {


	const [optionsTogggle, setOptionsToggle] = useState<boolean>(false);
	const [updateToggle, setUpdateToggle] = useState<boolean>(false);
	const [newMessage, setNewMessage] = useState<string | undefined>();
	const [createdAtDate, setCreatedAtDate] = useState<Date | null>();
	const [updatedAtDate, setUpdatedAtDate] = useState<Date | null>();
	const dispatch = useAppDispatch();

	useEffect(() => {

		if (post) {

			const createdAt = new Date(post.createdAt);
			const updatedAt = new Date(post.updatedAt);

			if (updatedAt.getMilliseconds() > createdAt.getMilliseconds()) {
				setUpdatedAtDate(updatedAt);
				setCreatedAtDate(undefined);
			} else {
				setUpdatedAtDate(undefined);
				setCreatedAtDate(createdAt);
			}

		}

	}, [post]);

	const deleteHandler = async () => {

		if (post) {

			await api.delete(`${url}/post/` + post.id);

			dispatch(deletePost(post.id));
			dispatch(deletePostFromCurrentUsersPosts(post.id));
			setOptionsToggle(false);

			if (!post.files) return 1;

			post.files.forEach(async (item) => {

				const fileDeleteRequest = await api.delete(`${url}/files/${item.id}?user_id=${user.id}`);
				const fileDeleteData = fileDeleteRequest.data;

				if (fileDeleteRequest.status !== 200) {
					notifyError(fileDeleteData);
				}

			})
		}
	}

	const updateHandler = async () => {

		if (post) {

			const updateResponse = await api.put(`${url}/post/` + post.id, { message: newMessage });
			const updateData = updateResponse.data;

			dispatch(updatePost(updateData));
			dispatch(updatePostFromCurrentUsersPosts(updateData));

			setOptionsToggle(false);
			setUpdateToggle(false);

		}
	}

	return (
		user &&
		<div className="w-full flex items-center gap-[10px] relative">
			<img src={imageUrl + user.avatar} alt="avatar" className="w-[45px] h-[45px] object-cover object-top rounded-full" />
			<div>
				<p className="text-sm-14 font-bold text-sky-600">{user.name + " " + user.surname}</p>
				<p className="text-sm-11 text-zinc-400">Published at:
					{createdAtDate && <span>{" " + createdAtDate.toDateString()}</span>}
					{updatedAtDate && <span>{" " + updatedAtDate.toDateString()}</span>}
				</p>
			</div>
			{
				status === "protected" &&
				<button
					onClick={() => {
						setOptionsToggle(prev => !prev);
						setUpdateToggle(false);
					}}
					className="w-[20px] h-[20px] text-zinc-700 ml-auto">
					{optionsTogggle ? <FaX /> : <FaEllipsisV />}
				</button>
			}
			{
				optionsTogggle ?
					<div className="absolute z-50 top-[40px] right-[10px] w-[130px] flex flex-col bg-slate-50 border text-sm-13 border-slate-400">
						<button
							onClick={() => setUpdateToggle(prev => !prev)}
							className="w-full p-2.5 flex gap-[5px] items-center border-b border-slate-400 transition hover:bg-sky-600 hover:text-white">
							<FaEdit /> Edit Post
						</button>
						<button
							onClick={() => notifyPromise(deleteHandler(), {
								pendingText: "Loading...",
								fulfilledText: "Post successfully deleted"
							})}
							className="w-full p-2.5 flex gap-[5px] items-center transition hover:bg-sky-600 hover:text-white">
							<FaTrash /> Delete Post
						</button>
					</div> : ""
			}
			{
				updateToggle ?
					<div className="absolute z-50 p-[10px] top-[40px] right-[140px] w-[250px] flex items-start justify-between bg-slate-50 border text-sm-13 border-slate-400">
						<textarea
							onChange={(event) => {
								const eventTarget = event.target as HTMLTextAreaElement;
								setNewMessage(eventTarget.value);
							}}
							defaultValue={post?.message}
							className="w-[70%] h-[150px] resize-none border border-zinc-400 outline-none" />
						<button
							onClick={() => notifyPromise(updateHandler(), {
								pendingText: "Loading...",
								fulfilledText: "Post successfully updated"
							})}
							className="w-[28%] bg-sky-600 rounded-md text-white">
							Update
						</button>
					</div> : ""
			}
		</div>
	)
}
