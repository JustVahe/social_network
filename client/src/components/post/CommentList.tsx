import { IComment } from './../../types'
import Comment from './Comment'

export default function CommentList({comments} : {comments : IComment[]}) {

  return (
    <div className='flex flex-col gap-[10px]'>
        {comments && comments.map((item) => {
            return <Comment comment={item} key={item.id}/>
        })}
    </div>
  )
}
