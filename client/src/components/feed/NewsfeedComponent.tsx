import Post from "../post/Post";
import { ID, IPost } from "../../types";
import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import { url } from "../../utils/enviromentConfig";
import { api } from "../../axios/axios";


export default function NewsfeedComponent({ id }: { id?: ID }) {

	const [posts, setPosts] = useState<IPost[] | null>();

	useEffect(() => {
		if (id) {
			api.get(`${url}/post/?user_id=` + id).then((response) => setPosts(response.data));
		}
	}, [id])

	return (
		<div className="2xl:max-w-[600px] xl:xl:max-w-[480px] flex flex-col gap-[20px]">
			{
				posts ? (
					posts.length !== 0 ?
						posts.map(item => <Post postData={item} key={item.id} />) : <div>This user has no posts yet</div>
				) : <div className="w-full">
					<Loading />
				</div>
			}
		</div>
	)
}
