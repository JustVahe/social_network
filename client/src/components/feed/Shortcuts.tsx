import { TfiClipboard, TfiCommentsSmiley, TfiImage, TfiUser } from "react-icons/tfi";

export default function Shortcuts() {
  return (
    <div className=" sticky top-[70px] w-full p-[20px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[240px]">
        <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Shortcuts</p>
        <div className="flex flex-col gap-[20px] mt-[30px]">
            <a href="#">
                <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                    <TfiClipboard/>
                    News Feed
                </p>
            </a>
            <a href="#">
                <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                    <TfiUser/>
                    Friends
                </p>
            </a>
            <a href="#">
                <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                    <TfiImage/>
                    Images
                </p>
            </a>
            <a href="#">
                <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                    <TfiCommentsSmiley/>
                    Messages
                </p>
            </a>
        </div>
    </div>
  )
}
