import MessageBox from "./MessageBox";
import MessagesLeft from "./MessagesLeft";

export default function MessageContainer() {

  return (
    <div className='w-full grid grid-cols-5'>
        <MessagesLeft />
        <MessageBox/>
    </div>
  )
}
