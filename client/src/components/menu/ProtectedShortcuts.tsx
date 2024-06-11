import { TfiClipboard, TfiCommentsSmiley, TfiImage, TfiUser } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function ProtectedShortcuts() {

    return (
        <div className="sm:row-span-1 xl:sticky xl:top-[70px] w-full p-[20px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[240px]">
            <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Shortcuts</p>
            <div className="flex flex-col gap-[20px] mt-[30px]">
                <Link to={`/dashboard`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiClipboard />
                        News Feed
                    </p>
                </Link>
                <Link to={`/dashboard/friends`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiUser />
                        Friends
                    </p>
                </Link>
                <Link to={`/dashboard/photos`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiImage />
                        Images
                    </p>
                </Link>
                <Link to={`/dashboard/messages`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiCommentsSmiley />
                        Messages
                    </p>
                </Link>
            </div>
        </div>
    )
}
