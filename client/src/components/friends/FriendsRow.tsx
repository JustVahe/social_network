import { IUser } from "../../types";

export default function FriendsRow({item, type} : {item : IUser, type: string}) {

    return (
        <div className="bg-white p-5 flex justify-between border border-slate-100">
            <div className="flex gap-[20px]">
                <img src={item.avatar} alt={item.username} className="w-[60px] h-[60px] object-top object-cover"/>
                <div className="flex flex-col gap-[10px]">
                    <p className="text-md text-zinc-700 font-medium">{item.name} {item.surname}</p>
                    <p className="text-sm-14 text-sky-600 font-bold">@{item.username}</p>
                </div>
            </div>
            {
                type === "friend" ? 
                    <div className="flex gap-[10px] items-center">
                        <button className="bg-zinc-500 p-[5px] text-white text-sm-13 rounded-md">Unfriend</button>
                        <button className="bg-sky-600 p-[5px] text-white text-sm-13 rounded-md">Add Friend</button>
                    </div> 
                : type === "request" ? 
                <div className="flex gap-[10px] items-center">
                    <button className="bg-zinc-500 p-[5px] text-white text-sm-13 rounded-md">Decline</button>
                    <button className="bg-sky-600 p-[5px] text-white text-sm-13 rounded-md">Confirm</button>
                </div> : ""
            }
        </div>
    )
}
