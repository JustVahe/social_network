import { FormEvent, useState } from 'react'
import { IComment, IReply } from './../../types'
import Reply from './Reply'
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks'
import { updateComment } from '../../redux/slices/commentSlice'
import { selectCurrentUser } from '../../redux/slices/currentUserSlice'
import { url } from '../../utils/enviromentConfig'
import { notifyPromise } from '../../utils/toastification'
import { api } from '../../axios/axios'

export default function ReplyList({ thisComment, replyToggle, setReplyToggle, setThisComment }:
    {
        thisComment: IComment,
        replyToggle: boolean,
        setThisComment: React.Dispatch<React.SetStateAction<IComment | undefined>>,
        setReplyToggle: React.Dispatch<React.SetStateAction<boolean>>
    }) {

    const replies = thisComment.replies as IReply[];
    const [message, setMessage] = useState<string | undefined>();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const [ok, setOk] = useState(true);

    const replyHandler = async (event: FormEvent) => {

        if (thisComment) {

            const body = {
                user_id: currentUser?.id,
                comment_id: thisComment.id,
                message
            }

            await api.post(`${url}/replies/`, body);
            const repliesData: IComment = await (await api.get(`${url}/comments/` + thisComment.id)).data

            dispatch(updateComment(repliesData));
            setThisComment(repliesData);
            event.preventDefault();
            setReplyToggle(false);
        }
    }

    const replyAddingToggler = async (event: FormEvent) => {
            
            if (ok) {
                setOk(false);
                await replyHandler(event);
                setOk(true);
            }

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
                        onClick={(event) => {
                            notifyPromise(replyAddingToggler(event),{
                                pendingText: "Loading...",
                                fulfilledText: `You replied to ${thisComment.user.username}`
                            })
                        }}
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