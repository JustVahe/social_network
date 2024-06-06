// import { v4 } from "uuid";
// import FriendButton from "../buttons/FriendButton";

export default function MenuRightFriends() {

  
  return (
    <div className="hidden w-[70px] h-svh bg-white fixed top-0 right-0 z-10 shadow-xl shadow-zinc-300 lg:flex justify-center">
        <div className="mt-[90px] h-[570px] overflow-y-scroll no-scrollbar flex flex-col gap-[20px]">
          {
            // friends && friends.map(item => {
            //    return <FriendButton src={item.avatar} status={item.status} key={v4()}/>
            // })
          }
        </div>
    </div>
  )
}
