import { TfiClipboard, TfiCommentsSmiley, TfiImage, TfiUser } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { IUser } from "../../types";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";

export default function Shortcuts({ user }: { user: IUser }) {

    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <div className="sm:row-span-1 xl:sticky xl:top-[70px] w-full p-[20px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 rounded-md h-[240px]">
            <p className="text-md-16 font-semibold text-zinc-700 after:content-normal after:w-[58px] after:h-[2px] after:block after:bg-sky-600">Shortcuts</p>
            <div className="flex flex-col gap-[20px] mt-[30px]">
                <Link to={(user.username === currentUser?.username) ? `/dashboard` : `/${user?.username}/home`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiClipboard />
                        News Feed
                    </p>
                </Link>
                <Link to={(user.username === currentUser?.username) ? `/dashboard/friends` :`/${user?.username}/friends`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiUser />
                        Friends
                    </p>
                </Link>
                <Link to={(user.username === currentUser?.username) ? `/dashboard/photos` : `/${user?.username}/photos`}>
                    <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                        <TfiImage />
                        Images
                    </p>
                </Link>
                {
                    currentUser?.id === user?.id && <Link to={`/dashboard/messages`}>
                        <p className="text-gray-400 text-sm-14 flex items-center gap-[10px] transition hover:text-sky-600">
                            <TfiCommentsSmiley />
                            Messages
                        </p>
                    </Link>
                }
            </div>
        </div>
    )
}
