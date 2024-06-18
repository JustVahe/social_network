import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks"
import { selectUsers, setUsers } from "../../redux/slices/userSlice"
import FriendLabel from "../feed/FriendLabel";

export default function Searchbar({ searchToggle }: { searchToggle: boolean }) {

	const users = useAppSelector(selectUsers);
	const dispatch = useAppDispatch();

	useEffect(() => {

		fetch("/api/users/")
			.then(response => response.json())
			.then(data => dispatch(setUsers(data)));

	}, [dispatch])

	return (
		<div className={"overflow-hidden rounded-b-md z-50 w-full bg-[#fdfdfd] shadow-zinc-300/65 shadow-md absolute xl:w-[300px] transition-all top-[69px] " + (searchToggle ? "2xl:right-[250px] xl:right-[150px] xl:left-auto left-0 opacity-100" : "right-[-325px] opacity-0")}>
			<div className="w-full bg-sky-600 p-1.5">
				<input type="text" placeholder="Search..." className="bg-transparent w-full outline-none text-white placeholder:text-white" />
			</div>
			<div className="p-[10px] shadow-zinc-700 shadow-lg">
				{
					users && users.map(item => <FriendLabel friend={item} key={item.id} />)
				}
			</div>
		</div>
	)
}
