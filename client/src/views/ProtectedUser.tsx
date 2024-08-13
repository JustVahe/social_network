import Navbar from "../components/menu/Navbar";
import Footer from "../components/menu/Footer.tsx";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import UserEditButtons from "../components/buttons/UserEditButtons.tsx";
import { useAppSelector } from "../redux/typedHooks.ts";
import { selectCurrentUser } from "../redux/slices/currentUserSlice.ts";
import ProtectedUserFeed from "../components/protectedUser/ProtectedUserFeed.tsx";
import ProtectedUserNavbar from "../components/menu/ProtectedUserNavbar.tsx";
import ProtectedPhotoFeed from "../components/protectedUser/ProtectedPhotoFeed.tsx";
import UserEditFeed from "../components/feed/UserEditFeed.tsx";
import { imageUrl } from "../utils/enviromentConfig.ts";

export default function ProtectedUser({ page }: { page: string }) {

	const currentUser = useAppSelector(selectCurrentUser);

	return currentUser && (
		<>
			<Navbar />
			<header className="w-full h-[530px] overflow-hidden relative">
				<img
					src={`${imageUrl}` + currentUser.headerImg}
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
					<ProtectedPhotoFeed />
				) : page === "friends" ? (
					<FriendsFeed user={currentUser} status="protected" />
				) : page === "messages" ? (
					<MessagesFeed />
				) : page === "user_edit" ? (
					<UserEditFeed />
				)
				: ""}
			</div>
			<Footer />
		</>
	)
}
