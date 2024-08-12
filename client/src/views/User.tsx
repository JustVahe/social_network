import Navbar from "../components/menu/Navbar";
import UserFeed from "../components/feed/UserFeed.tsx";
import Footer from "../components/menu/Footer.tsx";
import UserNavbar from "../components/menu/UserNavbar.tsx";
import PhotoFeed from "../components/photoPageComponents/PhotoFeed";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks.ts";
import { selectThisUser, setThisUser } from "../redux/slices/thisUserSlice.ts";
import { useCheck } from "../utils/hooks/useCheck.ts";
import { imageUrl, url } from "../utils/enviromentConfig.ts";
import { api } from "../axios/axios.ts";

export default function User({ page }: { page: string }) {

	const { username } = useParams();
	const thisUser = useAppSelector(selectThisUser);
	const dispatch = useAppDispatch();

	const { checkAccessToken } = useCheck();

	useEffect(() => {
		checkAccessToken();

		api.get(`${url}/users/?username=` + username)
			.then((res) => {
				dispatch(setThisUser(res.data));
			});

	// eslint-disable-next-line
	}, [username]);

	return (
		<>
			<Navbar />
			<header className="w-full h-[530px] overflow-hidden relative">
				<img
					src={`${imageUrl}` + thisUser?.headerImg}
					className="object-cover w-full h-[530px] object-top"
					alt="cover_image"
				/>
			</header>
			{thisUser && (
				<>
					<section>
						<UserNavbar thisUser={thisUser} />
					</section>
					<div className="container">
						{page === "timeline" ? (
							<UserFeed/>
						) : page === "photos" ? (
							<PhotoFeed user={thisUser} status="common" />
						) : page === "friends" ? (
							<FriendsFeed user={thisUser} />
						) : page === "messages" ? (
							<MessagesFeed />
						) : (
							""
						)}
					</div>
				</>
			)}
			<Footer />
		</>
	);
}
