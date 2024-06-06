import { ChangeEvent, FormEvent, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { useAppSelector } from "../../redux/typedHooks";
import { selectIsAuth } from "../../redux/slices/isAuthSlice";

export default function CommentBar() {

    const [commentMessage, setCommentMessage] = useState<string>();
    const [commentError, setCommentError] = useState<Error | undefined>();

    const isAuth = useAppSelector(selectIsAuth);

    const commentSendingHandler = async (event: FormEvent) => {

        event.preventDefault();

        try {

            if (isAuth) {

                if (commentMessage && commentMessage?.length !== 0) {

                    const body = {
                        message: commentMessage
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

                    setCommentError(undefined);

                } else {
                    throw new Error("Please write the message")
                }

            }



        } catch (error: unknown) {

            const commentEmptynessError = error as Error;
            setCommentError(commentEmptynessError);

        }


    }

    return (
        <>
            {
                commentError && <div className="w-full m-2.5 bg-red-50 p-[5px]">
                    {commentError.message}
                </div>
            }
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