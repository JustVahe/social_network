import admin from "../assets/admin.jpg"
import { FaChevronDown} from "react-icons/fa"
import { TfiHome, TfiMenu, TfiPencilAlt, TfiPowerOff, TfiSearch, TfiUser } from "react-icons/tfi"
import Logo from "../assets/Logo"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {

    const [dropdown, setDropdown] = useState<boolean>(false);
    const [userToggle, setUserToggle] = useState<boolean>(false);

    return (
        <>
            <nav className="w-full px-[20px] p-[12px] flex justify-between shadow-zinc-300 shadow-sm items-center bg-white fixed z-50 top-0">
                <Logo />
                <div className="w-[300px] hidden justify-between lg:flex">
                    <Link to="/user1/photos">
                        <p className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                            Images <span className="text-sm-11"><FaChevronDown /></span>
                        </p>
                    </Link>
                    <Link to="/user1/friends">
                        <p className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                            Friends <span className="text-sm-11"><FaChevronDown /></span>
                        </p>
                    </Link>
                    <Link to="/user1/messages">
                        <p className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                            Messages <span className="text-sm-11"><FaChevronDown /></span>
                        </p>
                    </Link>
                </div>
                <div className="w-[75px] flex justify-between text-lg">
                    <button className="w-[30px] h-[30px] grid place-items-center transition-all rounded-md hover:bg-zinc-300 hover:bg-opacity-45">
                        <TfiSearch />
                    </button>
                    <button className="w-[30px] h-[30px] grid place-items-center transition-all rounded-md hover:bg-zinc-300 hover:bg-opacity-45">
                        <TfiHome />
                    </button>
                </div>
                <div className="w-[100px] flex justify-between items-center">
                    <button onClick={() => setUserToggle(prev => !prev)} className="relative">
                        <img src={admin} alt="admin" className="w-[45px] h-[45px] rounded-full" />
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
                             <Link to={"/user1/userPage"}>
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
                    </button>
                    <button onClick={() => setDropdown(prev => !prev)}
                    className="w-[35px] h-[35px] grid place-items-center transition-all rounded-md hover:bg-zinc-300 hover:bg-opacity-45 text-xl text-zinc-700 lg:hidden">
                        <TfiMenu />
                    </button>
                </div>
                
            </nav>
            <div className={"lg:hidden absolute w-full bg-sky-600 top-[-132px] left-0 z-10 flex flex-col transition-all " + (dropdown ? "top-[69px]" : "")}>
                <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Images</button>
                <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Friends</button>
                <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Messages</button>
            </div>
        </>
        
        // z-[-50]
        
    )
}
