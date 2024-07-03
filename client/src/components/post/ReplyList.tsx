import { FormEvent, useState } from 'react'
import { IComment, IReply } from './../../types'
import Reply from './Reply'
import { useCheck } from '../../utils/hooks/useCheck'
import { notifyError, notifySuccess } from '../../utils/toastification'
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks'
import { updateComment } from '../../redux/slices/commentSlice'
import { selectCurrentUser } from '../../redux/slices/currentUserSlice'

export default function ReplyList({ thisComment, replyToggle, setReplyToggle, setThisComment }:
    {
        thisComment: IComment,
        replyToggle: boolean,
        setThisComment: React.Dispatch<React.SetStateAction<IComment | undefined>>,
        setReplyToggle: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const replies = thisComment.replies as IReply[];
    const { checkAccessToken } = useCheck();
    const [message, setMessage] = useState<string | undefined>();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);

    const replyHandler = async (event: FormEvent) => {

        await checkAccessToken();

        if (thisComment) {

            const body = {
                user_id: currentUser?.id,
                comment_id: thisComment.id,
                message
            }

            const replyResponse = await fetch("/api/replies/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (replyResponse.status === 200) {
                notifySuccess(`You replied to the comment of '${thisComment.user.username}'`);
            } else {
                notifyError("Something went wrong");
            }

            const repliesData: IComment = await (await fetch("/api/comments/" + thisComment.id)).json();

            dispatch(updateComment(repliesData));
            setThisComment(repliesData);

            event.preventDefault();
            setReplyToggle(false);
        }

        await checkAccessToken();

    }

    return (
        <div className='w-full flex flex-col gap-[10px] ml-10'>
            {
                replyToggle && <div className='w-[270px] rounded-sm ml-10 items-center flex gap-[10px] justify-start border border-gray-200 p-[5px]'>
                    <input
                        onChange={(event) => {
                            const eventTarget = event.target as HTMLInputElement;
                            setMessage(eventTarget.value);
                        }}
                        type="text"
                        className='border border-gray-200 rounded-sm p-[5px]' />
                    <button
                        onClick={replyHandler}
                        className='bg-sky-600 rounded-md p-[5px] text-white'>
                        Reply
                    </button>
                </div>
            }
            {
                replies && replies.map(
                    item => <Reply key={item.id} reply={item} />
                )
            }
        </div>
    )
}