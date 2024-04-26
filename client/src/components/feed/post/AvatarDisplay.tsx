import admin from "../../../assets/admin.jpg"

export default function AvatarDisplay() {
  return (
    <div className="w-full flex items-center gap-[10px]">
        <img src={admin} alt="admin" className="rounded-full"/>
        <div>
            <p className="text-sm-14 font-bold text-sky-600">Janis Joplin</p>
            <p className="text-sm-11 text-zinc-400">Published: June,2 2018 19:PM</p>
        </div>
    </div>
  )
}
