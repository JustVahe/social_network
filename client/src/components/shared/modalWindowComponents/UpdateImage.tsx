import { FaX } from "react-icons/fa6";
import ImgUpdatingForm from "../../forms/ImgUpdatingForm";
import { IPhoto } from "../../../types";
import { ModalResponse } from "../Image";

export default function UpdateImage({ setModalType, image }:
    { 
        setModalType: React.Dispatch<React.SetStateAction<boolean | string>>,
        setModalResponse: React.Dispatch<React.SetStateAction<ModalResponse | undefined>>
        image: IPhoto
    }) {
    return (
        image &&
        <div className="
            pointer-events-auto
            relative top-[200px] left-0 flex flex-col flex-grow
            right-0 mx-auto md:w-[500px] w-[300px] bg-[#fdfdfd] rounded-md">
            <button onClick={() => setModalType(false)} className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 transition hover:bg-sky-600">
                <FaX />
            </button>
            <div className="w-full bg-sky-600 p-0.5 rounded-t-md"></div>
            <div className="p-2.5">
                <h1 className="text-2xl text-zinc-800 text-center font-bold mt-10">Update Image</h1>
                <div className="p-2.5 mt-2.5 bg-[#fdfdfd] border">
                    <ImgUpdatingForm setModalType={setModalType} image={image} />
                </div>
            </div>
        </div>
    )
}
