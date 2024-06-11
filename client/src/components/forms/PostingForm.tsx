import { FaImage } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks"
import { addPostToCurrentUser, selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useRef, useState } from "react";
import { IPost } from "../../types";
import { useCheck } from "../../hooks/useCheck";
import { addPost } from "../../redux/slices/postSlice";

export default function PostingForm() {

	const currentUser = useAppSelector(selectCurrentUser);
	const [message, setMessage] = useState<string>();
	const [files, setFiles] = useState<FileList | null>();
	const { checkAccessToken } = useCheck();
	const textareaRef = useRef(null);

	const dispatch = useAppDispatch();
	const formData = new FormData();

	const postUploadingHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

		event.preventDefault();

		const postBody = {
			message
		}

		const postResponse = await fetch("/api/posts/" + currentUser?.id, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(postBody)
		});

		const data: IPost = await postResponse.json();

		if (data) {

			if (files) {
				Array.from(files).forEach(file => {
					formData.append("files", file);
				})

				formData.append("post_id", data.id as string);

				await fetch(`/api/files/${currentUser?.id}/post`, {
					method: "POST",
					body: formData
				});
			}

			const postRequest = await fetch(`/api/posts/${data.id}`);
			const post: IPost = await postRequest.json();

			textareaRef.current;

			dispatch(addPostToCurrentUser(post));
			dispatch(addPost(post));

			await checkAccessToken();

		}

	}
	return (
		<div className="w-full min-h-[160px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] flex gap-5 justify-between rounded-md">
			<img src={"/api/public/" + currentUser?.avatar} alt="admin" className="w-[45px] h-[45px] rounded-full object-cover object-top" />
			<div className="flex flex-col flex-grow w-full xl:max-w-[440px] lg:w-[85%] md:w-full min-h-[110px] bg-white border border-zinc-100 rounded-md p-[10px] relative">
				<textarea
					ref={textareaRef}
					className="resize-none w-full outline-none"
					placeholder="write something"
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
									<img src={url} alt="image" className="w-[80px] h-[80px] object-cover" />
									<button
										onClick={() => {
											// setFiles(files => {
											// 	const newFilelist = Array.from(files as Iterable<File>).filter((item, index) => index !== outerIndex) as unknown;
											// 	re	
											// })
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
					{/* <label htmlFor="music" className="text-zinc-600 cursor-pointer">
						<FaMusic />
					</label>
					<input className="w-0 opacity-0" type="file" name="music" id="music" /> */}
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
					<button onClick={(event) => postUploadingHandler(event)} className="px-[20px] py-[5px] leading-[13px] text-white rounded-md bg-sky-600 text-center text-sm-13 font-bold">Post</button>
				</div>
			</div>
		</div>
	)
}
