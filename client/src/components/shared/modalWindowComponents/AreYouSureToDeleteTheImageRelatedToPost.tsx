import { FaX } from "react-icons/fa6";
import { useCheck } from "../../../utils/hooks/useCheck";
import { IPhoto } from "../../../types";
import { useAppDispatch } from "../../../redux/typedHooks";
import { deletePost } from "../../../redux/slices/postSlice";
import { deletePostOfCurrentUser } from "../../../redux/slices/currentUserSlice";
import { ModalResponse } from "../Image";

export default function AreYouSureToDeleteTheImageRelatedToPost({ setModalType, setModalResponse, image }:
    {
        setModalType: React.Dispatch<React.SetStateAction<boolean | string>>,
        setModalResponse: React.Dispatch<React.SetStateAction<ModalResponse | undefined>>,
        image: IPhoto
    }) {

    const { checkAccessToken } = useCheck();
    const dispatch = useAppDispatch();

    const deleteHandler = async () => {

        await checkAccessToken();

        const postRequest = await fetch("/api/posts/" + image.post_id);
        const post = await postRequest.json();

        if (post && image) {

            const deleteRequest = await fetch("/api/posts/" + image.post_id, { method: "DELETE" });
            const data = await deleteRequest.json();

            post.files.forEach(async (item: IPhoto) => {

                const fileDeleteRequest = await fetch("/api/files/" + item.id, { method: "DELETE" });
                const fileDeleteData = await fileDeleteRequest.json();

                if (fileDeleteRequest.status !== 200) {
                    setModalResponse({
                        type: "error",
                        message: fileDeleteData
                    });
                }

            })

            if (deleteRequest.status === 200) {
                setModalResponse({
                    type: "success",
                    message: data
                });
            } else {
                setModalResponse({
                    type: "error",
                    message: data
                });
            }

            dispatch(deletePost(image.post_id));
            dispatch(deletePostOfCurrentUser(image.post_id));
            setModalType(false);

            await checkAccessToken();
        }
    }

    return (
        <>
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
                    <p className="text-sm text-center text-zinc-500">This image is related to a post, so we also have to delete the post</p>
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
        </>

    )
}
