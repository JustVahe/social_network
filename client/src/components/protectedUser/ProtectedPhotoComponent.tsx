import ImgSendingForm from "../forms/ImgSendingForm";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import Image, { ModalResponse } from "../shared/Image";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "../../utils/toastification";

export default function ProtectedPhotoComponent() {

    const currentUser = useAppSelector(selectCurrentUser);
    const [modalResponse, setModalResponse] = useState<ModalResponse | undefined>();

    useEffect(() => {
        if (modalResponse) {
            if (modalResponse.type === "error") {
                notifyError(modalResponse.message);
            } else {
                notifySuccess(modalResponse.message);
            }
        }
    }, [modalResponse])


    return (
        <>
            <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">

                {(currentUser && !(currentUser.files.length === 0)) ? currentUser.files.map(item => {
                    return <Image setModalResponse={setModalResponse} image={item} alt="user_image" containerStyles="w-full h-[200px]" key={item.id} />
                }) :
                    <div>
                        <p className="text-lg text-zinc-700">This user has no Images</p>
                    </div>
                }
            </div>
            <ImgSendingForm />
        </>
    )
}
