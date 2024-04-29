import { TfiPencilAlt, TfiPowerOff, TfiUser } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

export default function AdminDropdown({userToggle} : {userToggle : boolean}) {
  return (
    <div className={(userToggle ? "block "  : "hidden ") +" w-[150px] bg-zinc-50 absolute top-[60px] border border-slate-200 right-[-20px] flex flex-col"}>
                             <button className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex justify-between items-center">
                                <p className="text-sm-13">Online</p>
                                <div className={`w-3 h-3 bg-green-700 rounded-full grid place-items-center after:w-1.5 after:h-1.5 after:rounded-full after:bg-white  `}></div>
                             </button>
                             <button className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex justify-between items-center">
                                <p className="text-sm-13">Away</p>
                                <div className={`w-3 h-3 bg-yellow-500 rounded-full grid place-items-center after:w-1.5 after:h-1.5 after:rounded-full after:bg-white  `}></div>
                             </button>
                             <button className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex justify-between items-center">
                                <p className="text-sm-13">Offline</p>
                                <div className={`w-3 h-3 bg-zinc-700 rounded-full grid place-items-center after:w-1.5 after:h-1.5 after:rounded-full after:bg-white  `}></div>
                             </button>
                             <Link to={"/feed/userPage"}>
                                <button className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex gap-[10px] items-center">
                                   <span className="text-sky-600"><TfiUser /></span>
                                   <p className="text-sm-13">View Profile</p>
                                </button>
                             </Link>
                             <button className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex gap-[10px] items-center">
                                <span className="text-sky-600"><TfiPencilAlt /></span>
                                <p className="text-sm-13">Edit Profile</p>
                             </button>
                             <Link to={"/"}>
                                <button className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex gap-[10px] items-center">
                                   <span className="text-sky-600"><TfiPowerOff /></span>
                                   <p className="text-sm-13">Log Out</p>
                                </button>
                             </Link>
                        </div>
  )
}
