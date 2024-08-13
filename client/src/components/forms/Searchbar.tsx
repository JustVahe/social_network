import { ChangeEvent, useState } from "react"
import FriendLabel from "../friends/FriendLabel";
import { IUser } from "../../types";
import { url } from "../../utils/enviromentConfig";
import { api } from "../../axios/axios";

export default function Searchbar({ searchToggle, setSearchToggle }: { searchToggle: boolean, setSearchToggle?:React.Dispatch<React.SetStateAction<boolean>> }) {

	const [users, setUsers] = useState<IUser[] | undefined>();
	
	const searchHandler = async (event : ChangeEvent ) => {
		const eventTarget = event.target as HTMLInputElement;
		if (eventTarget.value?.trim().length != 0) {
			const searchResponse = await api.get(`${url}/users?filter=name&value=`+eventTarget.value.toLowerCase());
			const searchData = await searchResponse.data;
			setUsers(searchData);
		} else {
			setUsers(undefined);
		}
	}

	return (
		<div className={"overflow-hidden rounded-b-md z-50 w-full bg-[#fdfdfd] shadow-zinc-300/65 shadow-md absolute xl:w-[300px] transition-all top-[69px] " + (searchToggle ? "2xl:right-[250px] xl:right-[150px] xl:left-auto left-0 opacity-100" : "right-full xl:right-[-325px] opacity-0")}>
			<div className="w-full bg-sky-600 p-1.5">
				<input
					onChange={searchHandler}
					type="text"
					placeholder="Search..."
					className="bg-transparent w-full outline-none text-white placeholder:text-white" />
			</div>
			<div className="p-[10px] h-[300px] overflow-x-hidden overflow-y-scroll no-scrollbar shadow-zinc-700 shadow-lg flex flex-col gap-[10px]">
				{
					users ? users.map(item => <FriendLabel friend={item} key={item.id} setSearchToggle={setSearchToggle} />) 
						: <p className="text-zinc-500 text-sm-14 italic">Explore...</p>
				}
			</div>
		</div>
	)
}
