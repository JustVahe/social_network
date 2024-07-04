import { FaX } from "react-icons/fa6";
import { ModalResponse } from "../Image";
import { IPhoto } from "../../../types";
import { useCheck } from "../../../utils/hooks/useCheck";
import { url } from "../../../utils/enviromentConfig";

export default function AreYouSureToDeleteThisImage({ setModalType, setModalResponse, image }:
    {
        setModalType: React.Dispatch<React.SetStateAction<boolean | string>>,
        setModalResponse: React.Dispatch<React.SetStateAction<ModalResponse | undefined>>,
        image: IPhoto
    }) {

    const { checkAccessToken } = useCheck();

    const deleteHandler = async () => {

        await checkAccessToken();

        const fileDeleteRequest = await fetch(`${url}/files/` + image.id, { method: "DELETE" });
        const fileDeleteData = await fileDeleteRequest.json()

        if (fileDeleteRequest.status !== 200) {
            setModalResponse({
                type: "error",
                message: fileDeleteData
            });
        } else {
            setModalResponse({
                type: "success",
                message: fileDeleteData
            })
        }

        await checkAccessToken();

    }


    return (
        <div className="
            pointer-events-auto
            relative top-[200px] left-0 flex flex-col flex-grow
            right-0 mx-auto w-[300px] bg-[#fdfdfd] rounded-md">
            <button onClick={() => setModalType(false)} className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 transition hover:bg-sky-600">
                <FaX />
            </button>
            <div className="w-full bg-sky-600 p-0.5 rounded-t-md"></div>
            <div className="p-2.5">
                <h1 className="text-2xl text-zinc-800 text-center font-bold mt-10">Are you sure to delete this image?</h1>
            </div>
            <div className="p-2.5 flex gap-2.5 mx-auto">
                <button
                    onClick={() => {
                        setModalType(false);
                    }}
                    className="bg-zinc-500 p-[5px] text-sm-14 text-white font-bold rounded-md">
                    Cancel
                </button>
                <button
                    onClick={() => {
                        deleteHandler();
                    }}
                    className="bg-sky-600 p-[5px] text-sm-14 text-white font-bold rounded-md">
                    Delete Anyway
                </button>
            </div>
        </div>
    )
}