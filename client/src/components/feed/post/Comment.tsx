import { FaReply } from "react-icons/fa"
import admin from "../../../assets/admin.jpg"
import { IComment } from "../../../types"
import CommentList from "./CommentList"

export default function Comment({comment} : {comment : IComment}) {
  return (
    <>
        <div className="w-full flex gap-[10px] items-start">
            <img src={admin} alt="user" className="rounded-full w-[30px] h-[30px] " />
            <div className="border border-gray-200  p-[10px]">
                <div className="flex gap-[10px]">
                    <p className="text-sm-13 text-zinc-700 font-bold">{comment.from}</p>
                    <button className="text-zinc-700 transition hover:text-sky-600">
                        <FaReply />
                    </button>
                </div>
                <p className="text-zinc-400 text-sm-13">{comment.message}</p>
            </div>
        </div>
        <div className="ml-10">
            <CommentList comments={comment.replies} />
        </div>
    </>
    
  )
}
