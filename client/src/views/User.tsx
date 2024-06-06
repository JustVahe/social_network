import Navbar from "../components/menu/Navbar";
import UserFeed from "../components/user/UserFeed.tsx";
import Footer from "../components/Footer";
import UserNavbar from "../components/user/UserNavbar";
import PhotoFeed from "../components/photoPageComponents/PhotoFeed";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import UserEditButtons from "../components/user/UserEditButtons.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks.ts";
import { selectThisUser, setThisUser } from "../redux/slices/thisUserSlice.ts";
import { selectCurrentUser, setUser } from "../redux/slices/currentUserSlice.ts";
import { useCheck } from "../hooks/useCheck.ts";

export default function User({ page }: { page: string }) {

	const { username } = useParams();
	const thisUser = useAppSelector(selectThisUser);
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(selectCurrentUser);

	const { checkAccessToken } = useCheck();

	useEffect(() => {

		checkAccessToken();

		fetch("/api/users/?username=" + username)
			.then((res) => res.json())
			.then((data) => {
				dispatch(setThisUser(data));
				dispatch(setUser(data));
			});

	// eslint-disable-next-line
	}, [username, dispatch, currentUser?.headerImg, currentUser?.avatar]);

	return (
		<>
			<Navbar />
			<header className="w-full h-[530px] overflow-hidden relative">
				<img
					src={"/api/public" + thisUser?.headerImg}
					className="object-cover w-full h-[530px] object-top"
				/>
				{
					currentUser && (currentUser?.id === thisUser?.id && <UserEditButtons id={currentUser.id} />)
				}

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
							<PhotoFeed id={thisUser.id} />
						) : page === "friends" ? (
							<FriendsFeed id={thisUser.id} />
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
