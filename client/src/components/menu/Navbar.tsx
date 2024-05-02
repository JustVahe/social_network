import { FaChevronDown} from "react-icons/fa"
import { TfiHome, TfiMenu, TfiSearch} from "react-icons/tfi"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useAppSelector } from "../../redux/typedHooks"
import { selectCurrentUser } from "../../redux/slices/currentUserSlice"
import AdminDropdown from "../buttons/AdminDropdown"

export default function Navbar() {

    const [dropdown, setDropdown] = useState<boolean>(false);
    const [userToggle, setUserToggle] = useState<boolean>(false);

    const currentUser = useAppSelector(selectCurrentUser);
    
    return (
        <>
            {
                currentUser && <>
                    <nav className="w-full px-[20px] p-[12px] flex justify-between shadow-zinc-300 shadow-sm items-center bg-white fixed z-50 top-0">
                    <Link to={`/${currentUser?.id}/feed`}>
                        <img src="/logo.png"/>
                    </Link>
                    <div className="w-[300px] hidden justify-between lg:flex">
                        <Link to={`/${currentUser?.id}/photos`}>
                            <p className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                                Photos <span className="text-sm-11"><FaChevronDown /></span>
                            </p>
                        </Link>
                        <Link to={`/${currentUser?.id}/friends`}>
                            <p className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                                Friends <span className="text-sm-11"><FaChevronDown /></span>
                            </p>
                        </Link>
                        <Link to={`/${currentUser?.id}/messages`}>
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
                            <img src={currentUser?.avatar} alt="admin" className="w-[45px] h-[45px] rounded-full object-cover object-top" />
                            <AdminDropdown userToggle={userToggle} />
                        </button>
                        <button onClick={() => setDropdown(prev => !prev)}
                        className="w-[35px] h-[35px] grid place-items-center transition-all rounded-md hover:bg-zinc-300 hover:bg-opacity-45 text-xl text-zinc-700 lg:hidden">
                            <TfiMenu />
                        </button>
                    </div>
                </nav>
                <div className={"lg:hidden fixed w-full bg-sky-600 top-[-132px] left-0 z-10 flex flex-col transition-all " + (dropdown ? "top-[69px]" : "")}>
                <Link to={`/${currentUser?.id}/userPage`}>
                        <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Timeline</button>
                    </Link>
                    <Link to={`/${currentUser?.id}/photos`}>
                        <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Photos</button>
                    </Link>
                    <Link to={`/${currentUser?.id}/friends`}>
                        <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Friends</button>
                    </Link>
                    <Link to={`/${currentUser?.id}/messages`}>
                        <button className="p-[10px] text-white text-md uppercase font-semibold transition-all hover:bg-sky-500">Messages</button>
                    </Link>
                </div>
                </>
            }
        </>        
    )
}
