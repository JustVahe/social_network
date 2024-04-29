import FriendButton from "./buttons/FriendButton";
import friend1 from "../assets/friends/side-friend1.jpg"
import friend2 from "../assets/friends/side-friend2.jpg"
import friend3 from "../assets/friends/side-friend3.jpg"
import friend4 from "../assets/friends/side-friend4.jpg"
import friend5 from "../assets/friends/side-friend5.jpg"
import friend6 from "../assets/friends/side-friend6.jpg"
import friend7 from "../assets/friends/side-friend7.jpg"
import friend8 from "../assets/friends/side-friend8.jpg"
import friend9 from "../assets/friends/side-friend9.jpg"
import friend10 from "../assets/friends/side-friend10.jpg"
import { v4 } from "uuid";

const friends = [
  {
    imageSrc : friend1,
    status : "online"
  },
  {
    imageSrc : friend2,
    status : "offline"
  },
  {
    imageSrc : friend3,
    status : "away"
  },
  {
    imageSrc : friend4,
    status : "online"
  },
  {
    imageSrc : friend5,
    status : "away"
  },
  {
    imageSrc : friend6,
    status : "online"
  },
  {
    imageSrc : friend7,
    status : "online"
  },
  {
    imageSrc : friend8,
    status : "offline"
  },
  {
    imageSrc : friend9,
    status : "away"
  },
  {
    imageSrc : friend10,
    status : "offline"
  }
]

export default function MenuRightFriends() {
  return (
    <div className="hidden w-[70px] h-svh bg-white fixed top-0 right-0 z-10 shadow-xl shadow-zinc-300 lg:flex justify-center">
        <div className="mt-[90px] h-[570px] overflow-y-scroll no-scrollbar flex flex-col justify-between">
          {
            friends && friends.map(item => {
               return <FriendButton src={item.imageSrc} status={item.status} key={v4()}/>
            })
          }
        </div>
    </div>
  )
}
