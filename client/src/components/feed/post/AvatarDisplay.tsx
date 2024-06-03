import { IUser } from "../../../types";

export default function AvatarDisplay({user} : {user : IUser}) {
  return (
    <div className="w-full flex items-center gap-[10px]">
        <img src={"/api/public"+user.avatar} alt="admin" className="w-[45px] h-[45px] object-cover object-top rounded-full"/>
        <div>
            <p className="text-sm-14 font-bold text-sky-600">{
              user?.name + " " + user?.surname
            }</p>
            <p className="text-sm-11 text-zinc-400">Published: June,2 2018 19:PM</p>
        </div>
    </div>
  )
}
