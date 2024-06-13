import { FaReply } from "react-icons/fa"
import { IComment } from "./../../types"
import { useEffect, useState } from "react";
import ReplyList from "./ReplyList";

export default function Comment({ comment }: { comment: IComment }) {

    const [thisComment, setThisComment] = useState<IComment | undefined>();

    useEffect(() => {

        fetch("/api/comments/" + comment.id)
            .then(response => response.json())
            .then(data => {
                setThisComment(data)
            });
        
    }, [comment.id]);

    return (
        <>
            {
                thisComment && <div className="w-full flex gap-[10px] items-start">
                    <img src={"/api/public/" + thisComment.user.avatar} alt="avatar" className="rounded-full w-[30px] h-[30px] object-cover object-top" />
                    <div className="border border-gray-200  p-[10px]">
                        <div className="flex gap-[10px]">
                            <p className="text-sm-13 text-zinc-700 font-bold">{thisComment.user.username}</p>
                            <button className="text-zinc-700 transition hover:text-sky-600">
                                <FaReply />
                            </button>
                        </div>
                        <p className="text-zinc-400 text-sm-13">{thisComment.message}</p>
                    </div>
                </div>
            }
            {
                thisComment?.replies && <ReplyList replies={thisComment.replies} />
            }
        </>

    )
}
