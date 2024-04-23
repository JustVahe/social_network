import logo from "../assets/logo.png"
import admin from "../assets/admin.jpg"
import { FaChevronDown, FaGlobeAmericas } from "react-icons/fa"
import { TfiBell, TfiComment, TfiHome, TfiMenu, TfiSearch } from "react-icons/tfi"

export default function Navbar() {
  return (
    <nav className="w-full px-[20px] p-[12px] flex justify-between shadow-zinc-300 shadow-sm items-center bg-white fixed z-20">
        <img src={logo} alt="Winku" className="w-[120px]"/>
        <div className="w-[460px] flex justify-between">
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold">
                Home <span className="text-sm-11"><FaChevronDown /></span>
            </a>
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold">
                Timeline <span className="text-sm-11"><FaChevronDown /></span>
            </a>
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold">
                Account Settings <span className="text-sm-11"><FaChevronDown /></span>
            </a>
            <a href="#" className="text-sm-14 flex gap-[10px] items-center font-semibold">
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
            <img src={admin} alt="admin" className="w-[45px] h-[45px] rounded-full" />
            <span className="text-xl text-zinc-700"><TfiMenu /></span>
        </div>
    </nav>
  )
}
