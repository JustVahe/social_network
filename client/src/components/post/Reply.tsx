import { FaReply } from "react-icons/fa"
import { IReply } from "./../../types"
import { useEffect, useState } from "react";

export default function Reply({ reply }: { reply: IReply }) {

    const [thisReply, setThisComment] = useState<IReply | undefined>();

    useEffect(() => {

        fetch("/api/replies/" + reply.id)
            .then(response => response.json())
            .then(data => {
                setThisComment(data)
            });
            
    }, [reply.id])

    return (
        <>
            {
                thisReply && <div className="w-full flex gap-[10px] items-start">
                    <img src={"/api/public/" + thisReply.user.avatar} alt="avatar" className="rounded-full w-[30px] h-[30px] object-cover object-top" />
                    <div className="border border-gray-200  p-[10px]">
                        <div className="flex gap-[10px]">
                            <p className="text-sm-13 text-zinc-700 font-bold">{thisReply.user.username}</p>
                            <button className="text-zinc-700 transition hover:text-sky-600">
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