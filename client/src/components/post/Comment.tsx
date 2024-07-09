import { FaReply } from "react-icons/fa"
import { IComment } from "./../../types"
import { useEffect, useState } from "react";
import ReplyList from "./ReplyList";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { imageUrl, url } from "../../utils/enviromentConfig";

export default function Comment({ comment }: { comment: IComment }) {

    const [thisComment, setThisComment] = useState<IComment | undefined>();
    const [replyToggle, setReplyToggle] = useState<boolean>(false);
    const currentUser = useAppSelector(selectCurrentUser);

    useEffect(() => {

        fetch(`${url}/comments/` + comment.id)
            .then(response => response.json())
            .then(data => {
                setThisComment(data)
            });

    }, [comment.id]);

    return (
        <>
            {
                thisComment && <div className="w-[90%] flex gap-[10px] items-start">
                    <img src={imageUrl + thisComment.user.avatar} alt="avatar" className="rounded-full w-[30px] h-[30px] object-cover object-top" />
                    <div className="border border-gray-200  p-[10px]">
                        <div className="flex gap-[10px]">
                            {
                                thisComment.user.username === currentUser?.username ?
                                    <Link to={`/dashboard/home/`}>
                                        <p className="text-sm-13 text-zinc-700 font-bold">{thisComment.user.username}</p>
                                    </Link>
                                    :
                                    <Link to={`/${thisComment.user.username}/home/`}>
                                        <p className="text-sm-13 text-zinc-700 font-bold">{thisComment.user.username}</p>
                                    </Link>
                            }
                            <button
                                onClick={() => {
                                    setReplyToggle(prev => !prev);
                                }}
                                className="text-zinc-700 transition hover:text-sky-600">
                                {replyToggle ? <FaX /> : <FaReply />}
                            </button>
                        </div>
                        <p className="text-zinc-400 text-sm-13">{thisComment.message}</p>
                    </div>
                </div>
            }
            {
                thisComment &&
                <ReplyList
                    thisComment={thisComment}
                    setThisComment={setThisComment}
                    setReplyToggle={setReplyToggle}
                    replyToggle={replyToggle} />
            }
        </>

    )
}
