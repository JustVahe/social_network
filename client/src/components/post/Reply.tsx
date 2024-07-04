import { FaReply } from "react-icons/fa"
import { IReply } from "./../../types"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";

export default function Reply({ reply }: { reply: IReply }) {

    const [thisReply, setThisComment] = useState<IReply | undefined>();
    const currentUser = useAppSelector(selectCurrentUser);

    const url = import.meta.env.VITE_URL;

    useEffect(() => {

        fetch(`${url}/replies/` + reply.id)
            .then(response => response.json())
            .then(data => {
                setThisComment(data)
            });

    }, [reply.id])

    return (
        <>
            {
                thisReply && <div className="w-[90%] flex gap-[10px] items-start">
                    <img src={`${url}/public/` + thisReply.user.avatar} alt="avatar" className="rounded-full w-[30px] h-[30px] object-cover object-top" />
                    <div className="border border-gray-200  p-[10px]">
                        <div className="flex gap-[10px]">
                            {
                                thisReply.user.username === currentUser?.username ?
                                    <Link to={`/dashboard/home/`}>
                                        <p className="text-sm-13 text-zinc-700 font-bold">{thisReply.user.username}</p>
                                    </Link>
                                    :
                                    <Link to={`/${thisReply.user.username}/home/`}>
                                        <p className="text-sm-13 text-zinc-700 font-bold">{thisReply.user.username}</p>
                                    </Link>
                            }
                            <button
                                className="text-zinc-700 transition hover:text-sky-600">
                                <FaReply />
                            </button>
                        </div>
                        <p className="text-zinc-400 text-sm-13">{thisReply.message}</p>
                    </div>
                </div>
            }
        </>

    )
}

