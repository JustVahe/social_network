import { v4 } from 'uuid'
import { IComment } from '../../../types'
import Comment from './Comment'

export default function CommentList({comments} : {comments : IComment[]}) {

  return (
    <div className='w-full flex flex-col gap-[10px]'>
        {comments && comments.map((item) => {
            return <Comment comment={item} key={v4()}/>
        })}
    </div>
  )
}
