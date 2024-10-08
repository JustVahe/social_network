import { FaImage } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks"
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useRef, useState } from "react";
import { addPost } from "../../redux/slices/postSlice";
import { notifyError, notifyPromise } from "../../utils/toastification";
import { imageUrl, url } from "../../utils/enviromentConfig";
import { addPostToCurrentUsersPosts } from "../../redux/slices/currentUser'sPostsSlice";
import { api } from "../../axios/axios";

export default function PostingForm() {

	const currentUser = useAppSelector(selectCurrentUser);
	const [message, setMessage] = useState<string>();
	const [files, setFiles] = useState<FileList | null>();
	const textareaRef = useRef(null);

	const dispatch = useAppDispatch();
	const formData = new FormData();

	const postUploadingHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

		event.preventDefault();

		if (!files && !message) return notifyError("Post must have at least one file, or one text");

		const postBody = { message };

		const postResponse = await api.post(`${url}/post/` + currentUser?.id, postBody);
		const data = await postResponse.data;

		if (data) {

			if (files) {

				Array.from(files).forEach(file => {
					formData.append("files", file);
				})
				formData.append("post_id", data.id as string);

				await api.post(`${url}/files/${currentUser?.id}/post`, formData, {
					headers: {"Content-Type" : "multipart/form-data"}
				});
				
				const postResponse = await api.get(`${url}/post/` + data.id);
				const newPostData = postResponse.data;

				dispatch(addPostToCurrentUsersPosts(newPostData));
				dispatch(addPost(newPostData));
				setMessage("");
				setFiles(undefined);
			} else {
				dispatch(addPostToCurrentUsersPosts(data));
				dispatch(addPost(data));
				setMessage("");
			}
		}
	}

	return (
		<div className="w-full min-h-[160px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] flex gap-5 justify-between rounded-md">
			<img src={`${imageUrl}/` + currentUser?.avatar} alt="avatar" className="w-[45px] h-[45px] rounded-full object-cover object-top" />
			<div className="flex flex-col flex-grow w-full xl:max-w-[440px] lg:w-[85%] md:w-full min-h-[110px] bg-white border border-zinc-100 rounded-md p-[10px] relative">
				<textarea
					ref={textareaRef}
					className="resize-none w-full outline-none"
					placeholder="write something"
					value={message}
					onChange={(event) => {
						const eventTarget = event.target as HTMLTextAreaElement;
						setMessage(eventTarget.value);
					}} />
				{
					files && <div className="w-full flex flex-col gap-2.5">
						{
							Array.from(files).map((item, outerIndex) => {
								const url = URL.createObjectURL(item);
								return <div key={outerIndex} className="bg-sky-600 rounded-md flex justify-between items-center gap-2.5 p-[5px] w-full">
									<p className="text-sm-13 text-white w-3/4">
										{item.name}
									</p>
									<img src={url} alt="preview" className="w-[80px] h-[80px] object-cover" />
									<button
										onClick={() => {
											const data = [...files];
											data.splice(outerIndex, 1);
											const unknownData = data as unknown;
											setFiles(unknownData as FileList)
										}}
										className="text-sm-14 text-white p-[5px] rounded-sm hover:bg-white/35">
										X
									</button>
								</div>
							})
						}
					</div>
				}
				<div className="w-[90px] flex justify-between ml-auto mr-5 items-center">
					<label htmlFor="photo" className="text-zinc-600 cursor-pointer">
						<FaImage />
					</label>
					<input
						multiple
						className="w-0 opacity-0"
						type="file"
						name="photo"
						id="photo"
						onChange={(event) => {
							const eventTarget = event.target as HTMLInputElement;
							const files = eventTarget.files;
							setFiles(files);
						}} />
					<button onClick={(event) => notifyPromise(postUploadingHandler(event), {
						pendingText: "Loading...",
						fulfilledText: "Post successfully uploaded"
					})} className="px-[20px] py-[5px] leading-[13px] text-white rounded-md bg-sky-600 text-center text-sm-13 font-bold">Post</button>
				</div>
			</div>
		</div>
	)
}
