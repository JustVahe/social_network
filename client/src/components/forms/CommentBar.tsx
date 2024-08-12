import { ChangeEvent, FormEvent, useState } from "react";
import { FaMessage } from "react-icons/fa6";
import { IPost } from "../../types";
import { useCheck } from "../../utils/hooks/useCheck";
import { addComment } from "../../redux/slices/commentSlice";
import { useAppSelector } from "../../redux/typedHooks";
// import { updatePost } from "../../redux/slices/postSlice";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { url } from "../../utils/enviromentConfig";
import { notifyPromise } from "../../utils/toastification";
import { api } from "../../axios/axios";

export default function CommentBar({ postData }: { postData?: IPost }) {

    const [commentMessage, setCommentMessage] = useState<string>();
    const { checkAccessToken } = useCheck();
    // const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const [ok, setOk] = useState(true);

    const commentSendingHandler = async (event: FormEvent) => {

        event.preventDefault();
        await checkAccessToken();

        if (postData) {

            if (commentMessage && commentMessage?.length !== 0) {

                const body = {
                    message: commentMessage,
                    user_id: currentUser?.id,
                    post_id: postData.id
                }
                const commentResponse = await api.post(`${url}/comments`, body);
                const data = commentResponse.data;
                addComment(data);

                // if (commentResponse.status === 200) {

                //     api.get(`${url}/post/` + postData.id)
                //         .then(res => {
                //             dispatch(updatePost(res.data));
                //         })
                // }

                setCommentMessage("");
                await checkAccessToken();

            } else {
                throw new Error("Please write the message")
            }

        }

    }

    const commentAddingToggler = async (event: FormEvent) => {
        if (ok) {
            setOk(false);
            await commentSendingHandler(event);
            setOk(true);
        }
    }

    return (
        <>
            <div className="w-full ml-2.5 flex justify-between items-center p-[10px] bg-sky-50 rounded-md border border-blue-100 shadow-sm shadow-zinc-300">
                <input type="text"
                    value={commentMessage}
                    onChange={(event: ChangeEvent) => {
                        const target = event.target as HTMLInputElement;
                        setCommentMessage(target.value)
                    }}
                    className="w-[80%] bg-transparent p-[10px] outline-none placeholder:text-sky-800"
                    placeholder="Send Comment" />
                <button
                    onClick={(event) => notifyPromise(commentAddingToggler(event), {
                        pendingText: "Loading...",
                        fulfilledText: "Comment successfully added"
                    })}
                    className="p-[5px] bg-sky-600 text-white rounded-md flex items-center gap-[10px]">
                    <FaMessage />
                    Send
                </button>
            </div>
        </>
    )
}