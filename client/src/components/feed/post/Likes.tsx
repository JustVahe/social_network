import { FaComments, FaEye, FaShareAlt } from "react-icons/fa";
import { TfiHeart, TfiHeartBroken } from "react-icons/tfi";

export default function Likes() {
  return (
    <div className="flex gap-[45px] w-full mt-[20px]">
        <button className="relative text-md-16 text-zinc-700">
            <span className="absolute top-[-3px] text-sm-11 left-[15px]">1.2k</span>
            <FaEye />
        </button>
        <button className="relative text-md-16 text-zinc-700">
            <span className="absolute top-[-3px] text-sm-11 left-[12px]">52</span>
            <FaComments />
        </button>
        <button className="relative text-md-16 text-emerald-700">
            <span className="absolute top-[-3px] text-sm-11 left-[18px]">2.2k</span>
            <TfiHeart />
        </button>
        <button className="relative text-md-16 text-red-600">
            <span className="absolute top-[-3px] text-sm-11 left-[18px]">200</span>
            <TfiHeartBroken />
        </button>
        <button className="w-[24px] h-[24px] text-white bg-black rounded-full text-center text-sm-13 grid place-items-center leading-[13px] transition hover:bg-sky-600">
            <FaShareAlt />
        </button>
    </div>
  )
}
