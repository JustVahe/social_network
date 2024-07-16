import { FaComments, FaRegThumbsDown, FaRegThumbsUp, FaShareAlt, FaThumbsDown } from "react-icons/fa";
import { IPost, IReaction } from "../../types";
import { useEffect, useState } from "react";
import { url } from "../../utils/enviromentConfig";
import { FaThumbsUp } from "react-icons/fa6";

interface IProps {
    likes: IReaction[],
    dislikes: IReaction[],
    commentAmount: number,
    post: IPost,
    setLikes: React.Dispatch<React.SetStateAction<IReaction[] | undefined>>,
    setDislikes: React.Dispatch<React.SetStateAction<IReaction[] | undefined>>
}

export default function Likes({ likes, dislikes, commentAmount, post, setLikes, setDislikes }: IProps) {

    const [reactionToggle, setReactionToggle] = useState<"like" | "dislike" | undefined>();
    const [currentReaction, setCurrentReaction] = useState<IReaction | undefined>();
    const [ok, setOk] = useState(true);

    useEffect(() => {

        fetch(`${url}/reactions/?post_id=${post.id}&user_id=${post.user?.id}`)
            .then(res => res.json())
            .then(data => {
                setCurrentReaction(data);
            });

    }, [])

    const createReaction = async (toggle: "like" | "dislike") => {

        const reactionCreatingResponse = await fetch(`${url}/reactions/?post_id=${post.id}&type=${toggle}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ user_id: post.user.id })
        });
        const reactionCreatingData = await reactionCreatingResponse.json();

        if (reactionCreatingResponse.status !== 200) throw reactionCreatingData;

        return reactionCreatingData;

    }

    const reactingHandler = async (toggle: "like" | "dislike") => {

        if (!currentReaction) {

            const reactionCreatingData = await createReaction(toggle);

            if (toggle === "like") setLikes(prev => { if (prev) return [...prev, reactionCreatingData] })
            else if (toggle === "dislike") setDislikes(prev => { if (prev) return [...prev, reactionCreatingData] })

            setReactionToggle(toggle);
            setCurrentReaction(reactionCreatingData);

        } else if (currentReaction.type !== toggle) {

            await fetch(`${url}/reactions/${currentReaction.id}`, { method: "DELETE" });

            const reactionCreatingData = await createReaction(toggle);

            if (toggle === "like") {

                const outerIndex = likes.findIndex(item => item.id === reactionCreatingData.id);
                const data = [...likes];
                data.splice(outerIndex, 1);
                setDislikes(data);

                setLikes(prev => { if (prev) return [...prev, reactionCreatingData] });

            } else if (toggle === "dislike") {

                const outerIndex = dislikes.findIndex(item => item.id === reactionCreatingData.id);
                const data = [...dislikes];
                data.splice(outerIndex, 1);
                setLikes(data);

                setDislikes(prev => { if (prev) return [...prev, reactionCreatingData] })

            }

            setReactionToggle(toggle);
            setCurrentReaction(reactionCreatingData);

        }

    }

    const reactingToggler = async (toggle: "like" | "dislike") => {
        if (ok) {
            setOk(false);
            await reactingHandler(toggle);
            setOk(true);
        }
    }

    return (
        <div className="flex gap-[45px] w-full">
            <button className="relative text-md-16 text-zinc-700">
                <span className="absolute top-[-3px] text-sm-11 left-[18px]">
                    {(commentAmount / 1000) > 1 ? `.${commentAmount / 1000}k` : commentAmount}
                </span>
                <FaComments />
            </button>
            <button
                onClick={() => reactingToggler("like")}
                className="relative text-md-16 text-emerald-700">
                <span className="absolute top-[-3px] text-sm-11 left-[18px]">
                    {likes && ((likes.length / 1000) > 1 ? `.${likes.length / 1000}k` : likes.length)}
                </span>
                {(reactionToggle === "like" || currentReaction?.type === "like") ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </button>
            <button
                onClick={() => reactingToggler("dislike")}
                className="relative text-md-16 text-red-600">
                <span className="absolute top-[-3px] text-sm-11 left-[18px]">
                    {dislikes && ((dislikes.length / 1000) > 1 ? `.${dislikes.length / 1000}k` : dislikes.length)}
                </span>
                {(reactionToggle === "dislike" || currentReaction?.type === "dislike") ? <FaThumbsDown /> : <FaRegThumbsDown />}
            </button>
            <button className="w-[24px] h-[24px] text-white bg-black rounded-full text-center text-sm-13 grid place-items-center leading-[13px] transition hover:bg-sky-600">
                <FaShareAlt />
            </button>
        </div>
    )
}
