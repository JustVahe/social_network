import friend1 from "../../assets/friends/side-friend1.jpg"
import friend2 from "../../assets/friends/side-friend2.jpg"
import friend3 from "../../assets/friends/side-friend3.jpg"
import friend4 from "../../assets/friends/side-friend4.jpg"
import friend5 from "../../assets/friends/side-friend5.jpg"
import friend6 from "../../assets/friends/side-friend6.jpg"
import friend7 from "../../assets/friends/side-friend7.jpg"
import friend8 from "../../assets/friends/side-friend8.jpg"
import friend9 from "../../assets/friends/side-friend9.jpg"
import friend10 from "../../assets/friends/side-friend10.jpg"
import FriendLabel from "./FriendLabel"
import { v4 } from "uuid"
import { IUser } from "../../types"

const friends : IUser[] = [
  {
    imageSrc : friend1,
    status : "online",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",

  },
  {
    imageSrc : friend2,
    status : "offline",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend3,
    status : "away",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend4,
    status : "online",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend5,
    status : "away",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend6,
    status : "online",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend7,
    status : "online",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend8,
    status : "offline",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend9,
    status : "away",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  },
  {
    imageSrc : friend10,
    status : "offline",
    name: "Bucky",
    surname: "Barnes",
    email: "wintersolder@gmail.com",
  }
]

export default function Friends() {
  return (
    <div className="w-full p-[20px] px-[25px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[590px] flex flex-grow flex-col">
        <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Friends</p>
        <input type="text" className="w-full p-[5px] text-sm-13 border border-gray-200 mt-[20px] outline-none" placeholder="Search contacts" />
        <div className="w-full h-full no-scrollbar overflow-y-scroll flex flex-col mt-[20px] gap-5">
            {
                friends && friends.map(item => {
                    return <FriendLabel friend={item} key={v4()} />
                })
            }
        </div>
    </div>
  )
}
