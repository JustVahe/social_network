import Post from "../post/Post";
import { ID, IPost } from "../../types";
import { useEffect, useState } from "react";

export default function NewsfeedComponent({ id }: { id?: ID }) {

	const [posts, setPosts] = useState<IPost[] | null>();

	const url = import.meta.env.VITE_URL;

	console.log(url);
	
	useEffect(() => {

		if (id) {
			fetch(`${url}/posts/?user_id=` + id)
				.then((res) => res.json())
				.then((data: IPost[]) => {
					setPosts(data.sort((a, b) => {
						const firstPostDate = new Date(a.updatedAt)[Symbol.toPrimitive]("number");
						const secondPostDate = new Date(b.updatedAt)[Symbol.toPrimitive]("number");
						return firstPostDate - secondPostDate;
					}));
				}
				);
		}

	}, [id])

	return (
		<div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
			{
				posts && posts.map(item => <Post postData={item} key={item.id} />)
			}
		</div>
	)
}
