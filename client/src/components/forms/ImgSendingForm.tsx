import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import { useCheck } from "../../utils/hooks/useCheck";
import { notifyPromise } from "../../utils/toastification";
import { url } from "../../utils/enviromentConfig";
import { addPhotoToCurrentUser } from "../../redux/slices/currentUsersPhotosSlice";
import { api } from "../../axios/axios";

export default function ImgSendingForm() {

    const [files, setFiles] = useState<FileList | null>();
    const currentUser = useAppSelector(selectCurrentUser);
    const { checkAccessToken } = useCheck();
    const formData = new FormData;
    const [ok, setOk] = useState(true);
    const dispatch = useAppDispatch();

    const photoUploadHandler = async () => {

        if (currentUser && files) {

            Array.from(files).forEach(file => {
                formData.append("files", file);
            });

            const fileUploadResponse = await api.post(`${url}/files/${currentUser.id}`, formData, {
                headers: {"Content-Type" : "multipart/form-data"}
            });
            const fileUploadData = await fileUploadResponse.data;

            dispatch(addPhotoToCurrentUser(fileUploadData.data));
            setFiles(null);
            await checkAccessToken();

        } else if (!files) {
            throw new Error("Please add your images")
        }
    }
    
    const photoUploadToggler = async () => {
        if (ok) {
            setOk(false);
            await photoUploadHandler();
            setOk(true);
        }
    }

    return (
        <div className="w-full p-2.5 border border-sky-600/35 shadow-sm shadow-zinc-300 rounded-md bg-[#fdfdfd]">
            <div className="w-full flex justify-between items-center mb-2.5">
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
                            setFiles(eventTarget.files);
                        }} />
                    <button
                        onClick={() => {
                            notifyPromise(photoUploadToggler(), {
                                pendingText: "Loading",
                                fulfilledText: "Image uploaded successfully"
                            });
                        }}
                        className="w-[70px] p-2.5 bg-green-600 text-white text-sm-13 font-bold rounded-md">
                        Send
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full gap-2.5 pt-2.5 border-t border-t-sky-600/35">
                {
                    files && Array.from(files).map((item, index) => {
                        const fileUrl = URL.createObjectURL(item);
                        return <div key={index} className="flex justify-between p-2.5 bg-sky-600 rounded-md">
                            <p className="text-white w-3/4">{item.name}</p>
                            <img src={fileUrl} alt="preview" className="w-[50px] h-[50px] object-cover" />
                        </div>
                    })
                }
            </div>
        </div>

    )
}
