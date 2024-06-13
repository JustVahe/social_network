import { FaX } from "react-icons/fa6";
import { IPhoto } from "../../types";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import AreYouSureToDeleteTheImageRelatedToPost from "./modalWindowComponents/AreYouSureToDeleteTheImageRelatedToPost";
import AreYouSureToDeleteThisImage from "./modalWindowComponents/AreYouSureToDeleteThisImage";
import UpdateImage from "./modalWindowComponents/UpdateImage";
import { ModalResponse } from "./Image";

export default function ModalWindow({ type, image, setModalType, setModalResponse }:
    {
        type: string | boolean,
        image?: IPhoto,
        setModalType: React.Dispatch<React.SetStateAction<boolean | string>>,
        setModalResponse: React.Dispatch<React.SetStateAction<ModalResponse | undefined>>
    }) {

    const currentUser = useAppSelector(selectCurrentUser);
    useLockBodyScroll();

    return (
        <div className="w-screen pointer-events-none fixed z-50 top-0 left-0 h-screen bg-zinc-800/70 backdrop-blur-md">
            {
                image &&
                (type === "image" ?
                    <div className="pointer-events-auto relative top-[100px] h-[500px] left-0 right-0 mx-auto w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px]">
                        <button onClick={() => setModalType(false)} className="absolute top-2.5 right-2.5 bg-sky-600/40 rounded-md backdrop-blur-md text-white p-2.5 transition hover:bg-sky-600">
                            <FaX />
                        </button>
                        <img src={"/api/public/" + image.path} alt="photo" className="object-cover w-full h-full object-top" />
                        {
                            currentUser?.id === image.user_id &&
                            <div className="bg-zinc-800/40 backdrop-blur-md p-2.5 flex gap-2.5 w-full absolute bottom-0">
                                <button
                                    onClick={() => {
                                        setModalType("update_image")
                                    }}
                                    className="p-[5px] text-sm-13 text-white bg-sky-600 rounded-md">
                                    Change
                                </button>
                                <button
                                    onClick={() => {
                                        if (image.post_id) {
                                            setModalType("are_you_sure_to_delete_this_image_related_to_post");
                                        } else {
                                            setModalType("are_you_sure_to_delete_this_image");
                                        }
                                    }}
                                    className="p-[5px] text-sm-13 text-white bg-red-700 rounded-md">
                                    Delete
                                </button>
                            </div>
                        }
                    </div>
                    : type === "are_you_sure_to_delete_this_image_related_to_post" ?
                        <AreYouSureToDeleteTheImageRelatedToPost setModalType={setModalType} image={image} setModalResponse={setModalResponse} />
                        : type === "are_you_sure_to_delete_this_image" ?
                            <AreYouSureToDeleteThisImage setModalType={setModalType} image={image} setModalResponse={setModalResponse} />
                            : type === "update_image" ?
                                <UpdateImage setModalType={setModalType} image={image} setModalResponse={setModalResponse} />
                                :
                                "")
            }
        </div>
    )
}
