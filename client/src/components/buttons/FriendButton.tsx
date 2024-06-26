export default function FriendButton({src, status} : {src : string, status? : string}) {
  return (
    <div className="w-[34px] h-[34px] relative">
        <img src={src} className="w-[34px] h-[34px] rounded-full" alt="avatar"/>
        <div className={`w-3 h-3 ${(status === "offline") ? "bg-slate-500" : (status === "away") ? "bg-yellow-500": (status === "online") ? "bg-green-700" : "" }  absolute top-[22px] left-[22px] 
        rounded-full after:w-1.5 after:h-1.5 after:rounded-full after:bg-white
         after:content-normal after:block after:mx-[3px] after:my-[3px]`}></div>
    </div>
  )
}
