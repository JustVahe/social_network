import Post from "./post/Post";
import { ID, IPost } from "../../types";
import { useEffect, useState } from "react";

export default function NewsfeedComponent({ id }: { id?: ID }) {

	const [posts, setPosts] = useState<IPost[] | null>();

	useEffect(() => {

		if (id) {
			fetch("/api/posts/?user_id=" + id)
				.then((res) => res.json())
				.then(data => {
					setPosts(data);
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
