import Friends from "../friends/Friends";
import PostingForm from "../forms/PostingForm";
import HomeFeed from "./HomeFeed";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedShortcuts from "../menu/ProtectedShortcuts";
import { useEffect, useState } from "react";

export default function Feed() {

	const currentUser = useAppSelector(selectCurrentUser);
	const [pageWidth, setPageWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setPageWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (pageWidth <= 1280) {
		return (<div className="container relative mt-[100px]">
			<div className="w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]">
				<div className="xl:col-span-2 gap-5 sm:col-span-1">
					<ProtectedShortcuts />
				</div>
				<div className="xl:col-span-2 gap-5 sm:col-span-1">
					<PostingForm />
				</div>
				<div className="grid sm:col-span-1 w-full gap-5 content-start">
					{currentUser && <Friends user={currentUser} />}
					<HomeFeed />
				</div>
			</div>
		</div>)
	}

	return (
		<div className="container relative mt-[100px]">
			<div className="w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]">
				<div className="xl:col-span-2 gap-5 sm:col-span-1">
					<ProtectedShortcuts />
				</div>
				<div className="grid sm:col-span-1 w-full gap-5 content-start">
					<PostingForm />
					<HomeFeed />
				</div>
				<div className="xl:col-span-2 gap-5 sm:col-span-1">
					{currentUser && <Friends user={currentUser} />}
				</div>
			</div>
		</div>
	)
}
