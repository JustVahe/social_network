import { FaPaperPlane } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export default function MessageSendingBar({type} : {type: string}) {
  return (
    <div className="w-full ml-2.5 flex justify-between items-center p-[10px] bg-sky-50 rounded-md border border-blue-100 shadow-sm shadow-zinc-300">
        <input type="text" className="w-[80%] bg-transparent p-[10px] outline-none placeholder:text-sky-800" placeholder={(type === "message") ? "Send Message" : "Send Comment"} />
        <button className="p-[5px] bg-sky-600 text-white rounded-md flex items-center gap-[10px]">
          {(type === "message") ? <FaPaperPlane /> : <FaMessage />} 
          Send</button>
    </div>
  )
}
