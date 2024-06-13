import { ChangeEvent, FormEvent, useState } from "react";
import { FaMessage } from "react-icons/fa6";
// import { useAppSelector } from "../../redux/typedHooks";
// import { selectIsAuth } from "../../redux/slices/isAuthSlice";
import { notifyError } from "../../utils/toastification";
import { IPost } from "../../types";
import { useCheck } from "../../utils/hooks/useCheck";

export default function CommentBar({postData} : {postData : IPost}) {

    const [commentMessage, setCommentMessage] = useState<string>();
    const { checkAccessToken } = useCheck();

    const commentSendingHandler = async (event: FormEvent) => {

        event.preventDefault();
        await checkAccessToken();

        try {

            if (postData) {

                if (commentMessage && commentMessage?.length !== 0) {

                    const body = {
                        message: commentMessage,
                        user_id: postData.user.id,
                        post_id: postData.id
                    }
                    const commentResponse = await fetch("/api/comments", {
                        method: "POST",
                        headers: {
                            'Content-type': "application/json"
                        },
                        body: JSON.stringify(body)
                    });
                    const data = await commentResponse.json();
                    console.log(data);

                } else {
                    throw new Error("Please write the message")
                }

            }

        } catch (error: unknown) {
            const commentEmptynessError = error as Error;
            notifyError(commentEmptynessError.message);
        }
    }

    return (
        <>
            <div className="w-full ml-2.5 flex justify-between items-center p-[10px] bg-sky-50 rounded-md border border-blue-100 shadow-sm shadow-zinc-300">
                <input type="text"
                    onChange={(event: ChangeEvent) => {
                        const target = event.target as HTMLInputElement;
                        setCommentMessage(target.value);
                    }}
                    className="w-[80%] bg-transparent p-[10px] outline-none placeholder:text-sky-800"
                    placeholder="Send Comment" />
                <button
                    onClick={commentSendingHandler}
                    className="p-[5px] bg-sky-600 text-white rounded-md flex items-center gap-[10px]">
                    <FaMessage />
                    Send
                </button>
            </div>
        </>
    )
}