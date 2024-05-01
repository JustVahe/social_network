import { FaReply } from "react-icons/fa"
import { IComment } from "../../../types"
import { useAppSelector } from "../../../redux/typedHooks";
import { selectUsers } from "../../../redux/slices/userSlice";
// import CommentList from "./CommentList"

export default function Comment({comment} : {comment : IComment}) {

    const users = useAppSelector(selectUsers);
    const fromWho = users.find(item => item.id === comment.from);

  return (
    <>
        {
            fromWho && <div className="w-full flex gap-[10px] items-start">
            <img src={fromWho?.avatar} alt="user" className="rounded-full w-[30px] h-[30px] object-cover object-top" />
                <div className="border border-gray-200  p-[10px]">
                    <div className="flex gap-[10px]">
                        <p className="text-sm-13 text-zinc-700 font-bold">{fromWho?.username}</p>
                        <button className="text-zinc-700 transition hover:text-sky-600">
                            <FaReply />
                        </button>
                    </div>
                    <p className="text-zinc-400 text-sm-13">{comment.message}</p>
                </div>
            </div>
        }
        
        {/* <div className="ml-10">
            <CommentList comments={comment.replies} />
        </div> */}
    </>
    
  )
}
