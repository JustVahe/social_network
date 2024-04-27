import admin from "../assets/admin.jpg"
import { FaChevronDown, FaGlobeAmericas } from "react-icons/fa"
import { TfiBell, TfiComment, TfiHome, TfiMenu, TfiSearch } from "react-icons/tfi"
import Logo from "../assets/Logo"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="w-full px-[20px] p-[12px] flex justify-between shadow-zinc-300 shadow-sm items-center bg-white fixed z-50 top-0">
        <Logo />
        <div className="w-[460px] flex justify-between">
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                Home <span className="text-sm-11"><FaChevronDown /></span>
            </a>
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                Timeline <span className="text-sm-11"><FaChevronDown /></span>
            </a>
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                Account Settings <span className="text-sm-11"><FaChevronDown /></span>
            </a>
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold text-zinc-700">
                More Pages <span className="text-sm-11"><FaChevronDown /></span>
            </a>
        </div>
        <div className="w-[225px] flex justify-between text-lg">
            <TfiSearch />
            <TfiHome />
            <TfiBell />
            <TfiComment />
            <FaGlobeAmericas />
        </div>
        <div className="w-[100px] flex justify-between items-center">
            <Link to="/user1/userPage">
                <img src={admin} alt="admin" className="w-[45px] h-[45px] rounded-full" />
            </Link>
            <span className="text-xl text-zinc-700"><TfiMenu /></span>
        </div>
    </nav>
  )
}
