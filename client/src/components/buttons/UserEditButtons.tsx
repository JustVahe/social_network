import {FaEdit, FaImage} from "react-icons/fa";

export default function UserEditButtons() {
    return (
        <div className="flex flex-col gap-2.5 bg-zinc-50 backdrop-blur-lg
                        rounded-2xl p-2.5 absolute top-[450px] left-[350px]
                        bg-opacity-25 z-50">
            <button className="transition hover:text-white">
                <FaImage />
            </button>
            <button className="transition hover:text-white">
                <FaEdit />
            </button>
        </div>
    )
}