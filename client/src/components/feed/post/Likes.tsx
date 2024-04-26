import { FaComments, FaEye, FaShareAlt } from "react-icons/fa";
import { TfiHeart, TfiHeartBroken } from "react-icons/tfi";

export default function Likes({stats} : {stats : {
    likes : number,
    watches : number,
    dislikes : number,
    commentAmount : number
  }}) {
  return (
    <div className="flex gap-[45px] w-full">
        <button className="relative text-md-16 text-zinc-700">
            <span className="absolute top-[-3px] text-sm-11 left-[15px]">
            {(stats.watches / 1000) > 1 ? `.${stats.watches / 1000}k` : stats.watches}
            </span>
            <FaEye />
        </button>
        <button className="relative text-md-16 text-zinc-700">
            <span className="absolute top-[-3px] text-sm-11 left-[18px]">
            {(stats.commentAmount / 1000) > 1 ? `.${stats.commentAmount / 1000}k` : stats.commentAmount}
            </span>
            <FaComments />
        </button>
        <button className="relative text-md-16 text-emerald-700">
            <span className="absolute top-[-3px] text-sm-11 left-[18px]">
            {(stats.likes / 1000) > 1 ? `.${stats.likes / 1000}k` : stats.likes}
            </span>
            <TfiHeart />
        </button>
        <button className="relative text-md-16 text-red-600">
            <span className="absolute top-[-3px] text-sm-11 left-[18px]">
                {(stats.dislikes / 1000) > 1 ? `.${stats.dislikes / 1000}k` : stats.dislikes}
            </span>
            <TfiHeartBroken />
        </button>
        <button className="w-[24px] h-[24px] text-white bg-black rounded-full text-center text-sm-13 grid place-items-center leading-[13px] transition hover:bg-sky-600">
            <FaShareAlt />
        </button>
    </div>
  )
}
