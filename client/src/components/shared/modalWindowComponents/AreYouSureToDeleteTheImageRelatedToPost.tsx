import { FaX } from "react-icons/fa6";
import { IPhoto } from "../../../types";
import { useAppDispatch } from "../../../redux/typedHooks";
import { deletePost } from "../../../redux/slices/postSlice";
import { ModalResponse } from "../Image";
import {  url } from "../../../utils/enviromentConfig";
import { deletePostFromCurrentUsersPosts } from "../../../redux/slices/currentUser'sPostsSlice";
import { deletePhotoOfCurrentUser } from "../../../redux/slices/currentUsersPhotosSlice";
import { api } from "../../../axios/axios";

interface IProps {
    setModalType: React.Dispatch<React.SetStateAction<boolean | string>>,
    modalResponse?: ModalResponse | undefined,
    setModalResponse: React.Dispatch<React.SetStateAction<ModalResponse | undefined>>,
    image: IPhoto
}

export default function AreYouSureToDeleteTheImageRelatedToPost({ setModalType, setModalResponse, image }: IProps) {

    console.log(image.post_id);
    const dispatch = useAppDispatch();

    const deleteHandler = async () => {

        const getPost = await api.get(`${url}/post/` + image.post_id);

        if (!getPost.data) {
            const fileDeleteRequest = await api.delete(`${url}/files/` + image.id);
            const fileDeleteData = fileDeleteRequest.data;

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
                setModalType(false);
                dispatch(deletePhotoOfCurrentUser(image));
            }

            return 1;
        }

        const deleteResponse = await api.delete(`${url}/post/` + image.post_id);
        const post = await deleteResponse.data;

        if (image) {

            post.data.files.forEach(async (item: IPhoto) => {
                const fileDeleteRequest = await api.delete(`${url}/files/` + item.id);
                const fileDeleteData = await fileDeleteRequest.data;

                if (fileDeleteRequest.status !== 200) {
                    setModalResponse({
                        type: "error",
                        message: fileDeleteData.data
                    });
                }
            })

            if (deleteResponse.status === 200) {
                setModalResponse({
                    type: "success",
                    message: post.data
                });
            } else {
                setModalResponse({
                    type: "error",
                    message: post.data
                });
            }

            dispatch(deletePost(image.post_id));
            dispatch(deletePostFromCurrentUsersPosts(image.post_id));
            dispatch(deletePhotoOfCurrentUser(image));
            setModalType(false);
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
