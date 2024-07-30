import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { IPhoto } from "../../types";
import { notifyPromise } from "../../utils/toastification";
import { url } from "../../utils/enviromentConfig";
import { updatePhotoOfCurrentUser } from "../../redux/slices/currentUsersPhotosSlice";
import { api } from "../../axios/axios";

export default function ImgUpdatingForm({ image, setModalType }: { image: IPhoto, setModalType: React.Dispatch<React.SetStateAction<boolean | string>> }) {

    const [file, setFile] = useState<File | null>();
    const currentUser = useAppSelector(selectCurrentUser);
    const formData = new FormData();
    const [ok, setOk] = useState(true);
    const dispatch = useAppDispatch();

    const photoUploadHandler = async () => {

        if (currentUser && file) {

            formData.append("user_id", image.user_id as string);
            formData.append("file", file);

            const fileResponse = await api.put(`${url}/files/${image.id}`, formData);

            const updateImageData = await fileResponse.data;

            if (fileResponse.status !== 200) {
                throw new Error(updateImageData.message);
            }

            setModalType(false);
            setFile(null);
            dispatch(updatePhotoOfCurrentUser(updateImageData.data));

        }
    }

    const photoUpdateToggler = async () => {
        if (ok) {
            setOk(false);
            await photoUploadHandler();
            setOk(true);
        }
    }

    return (
        <div className="w-full p-2.5 border border-sky-600/35 shadow-sm shadow-zinc-300 rounded-md bg-[#fdfdfd]">
            <div className="w-full flex-col flex md:flex-row justify-between items-center mb-2.5 ">
                <p className="text-sky-600" >Send Images</p>
                <div className="flex gap-2.5">
                    <label
                        htmlFor="image-send"
                        className="w-[120px] p-2.5 cursor-pointer bg-sky-600 rounded-md text-center text-white text-sm-13 font-bold">
                        Select Images
                    </label>
                    <input
                        multiple
                        type="file"
                        name="image-send"
                        id="image-send"
                        className="hidden"
                        onChange={(event) => {
                            const eventTarget = event.target as HTMLInputElement;
                            if (eventTarget.files) {
                                setFile(eventTarget.files[0]);
                            }
                        }} />
                    <button
                        onClick={() => {
                            notifyPromise(photoUpdateToggler(), {
                                pendingText: "Loading...",
                                fulfilledText: "Image successfully uploaded"
                            })
                        }}
                        className="w-[70px] p-2.5 bg-green-600 text-white text-sm-13 font-bold rounded-md">
                        Send
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2.5 pt-2.5 border-t border-t-sky-600/35">
                {
                    file && <div className="flex justify-between p-2.5 bg-sky-600 rounded-md">
                        <p className="text-white w-3/4">{file.name}</p>
                        <img src={URL.createObjectURL(file)} alt="preview" className="w-[50px] h-[50px] object-cover" />
                    </div>
                }
            </div>
        </div>

    )
}
