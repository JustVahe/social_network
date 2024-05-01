import { TfiBell } from "react-icons/tfi";
import { ID } from "../../types";
import MessageContainer from "./MessageContainer";

export default function MessagesComponent() {
  return (
    <div className="w-full gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
      <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600 mb-[25px]">
        <span className="text-sky-600 float-left mr-[5px]">
          <TfiBell />
        </span>
        All Messages
      </p>
      <MessageContainer />
    </div>
  )
}
