import { FaPaperPlane } from "react-icons/fa";

export default function MessageSendingBar() {
  return (
    <div className="w-full ml-2.5 flex justify-between items-center p-[10px] bg-sky-50 rounded-md border border-blue-100 shadow-sm shadow-zinc-300">
        <input type="text" className="w-[80%] bg-transparent p-[10px] outline-none placeholder:text-sky-800" placeholder="Send Message" />
        <button className="p-[5px] bg-sky-600 text-white rounded-md flex items-center gap-[10px]">
          <FaPaperPlane />
          Send</button>
    </div>
  )
}
