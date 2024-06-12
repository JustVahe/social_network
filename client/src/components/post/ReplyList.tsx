import { IReply } from '../../../types'
import Reply from './Reply'

export default function ReplyList({ replies }: { replies: IReply[] }) {

    return (
        <div className='w-full flex flex-col gap-[10px] ml-10'>
            {
                replies && replies.map(
                    item => <Reply key={item.id} reply={item} />
                )
            }
        </div>
    )
}