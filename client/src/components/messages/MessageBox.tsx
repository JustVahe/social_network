import MessageSendingBar from "../forms/MessageBar";
import Message from "./Message";

export default function MessageBox() {
  return (
    <div className="mt-6 sm:mt-0 col-span-5 sm:col-span-3 xl:col-span-4 relative">
        <div className="w-full absolute top-0 flex gap-[15px] p-2.5 pt-0 border-b border-b-slate-200">
            <img src="/user-avatar.jpg" alt="message_to_this_user" className="w-[45px] h-45px] object-cover object-top"/>
            <div>
                <p className="text-sm-14 font-bold text-zinc-700">Kurt Cobain</p>
                <p className="text-sm-14 font-light text-zinc-700">online</p>
            </div>
        </div>
        <div className="mt-[60px] p-[10px]">
            <Message align="left" message="Kill Yourself!!" ></Message>
            <Message align="right" message="Only in your dreams!!" ></Message>
            <Message align="left" message="I hate you with all my heart and soul, i will destroy you one day, i am sure." ></Message>
        </div>
        <MessageSendingBar />
    </div>
  )
}
