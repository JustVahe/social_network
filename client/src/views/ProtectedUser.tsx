import Navbar from "../components/menu/Navbar";
import Footer from "../components/Footer";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import UserEditButtons from "../components/user/UserEditButtons.tsx";
import { useAppSelector } from "../redux/typedHooks.ts";
import { selectCurrentUser } from "../redux/slices/currentUserSlice.ts";
import ProtectedUserFeed from "../components/protectedUser/ProtectedUserFeed.tsx";
import ProtectedUserNavbar from "../components/menu/ProtectedUserNavbar.tsx";
import { useEffect } from "react";
import { useCheck } from "../utils/hooks/useCheck.ts";
import ProtectedPhotoFeed from "../components/protectedUser/ProtectedPhotoFeed.tsx";

export default function ProtectedUser({ page }: { page: string }) {

	const currentUser = useAppSelector(selectCurrentUser);
	const { checkAccessToken } = useCheck();

	useEffect(() => {
		checkAccessToken();
		//eslint-disable-next-line
	}, [])

	return currentUser && (
		<>
			<Navbar />
			<header className="w-full h-[530px] overflow-hidden relative">
				<img
					src={"/api/public" + currentUser.headerImg}
					className="object-cover w-full h-[530px] object-top"
					alt="cover_image"
				/>
				{currentUser && <UserEditButtons id={currentUser.id} />}
			</header>
			<section>
				<ProtectedUserNavbar />
			</section>
			<div className="container">
				{page === "timeline" ? (
					<ProtectedUserFeed />
				) : page === "photos" ? (
					<ProtectedPhotoFeed id={currentUser.id} />
				) : page === "friends" ? (
					<FriendsFeed id={currentUser.id} />
				) : page === "messages" ? (
					<MessagesFeed />
				) : (
					""
				)}
			</div>
			<Footer />
		</>
	)
}
