import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import ProtectedShortcuts from "../menu/ProtectedShortcuts";
import ProtectedPhotoComponent from "./ProtectedPhotoComponent";
import FriendsProtected from "../friends/FriendsProtected";
import { useEffect } from "react";
import { url } from "../../utils/enviromentConfig";
import { setCurrentUsersPhotos } from "../../redux/slices/currentUsersPhotosSlice";
import { api } from "../../axios/axios";

export default function ProtectedPhotoFeed() {

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    useEffect(() => {

        setTimeout(() => {
            api.get(`${url}/files/` + currentUser?.id)
            .then(response => {
                dispatch(setCurrentUsersPhotos(response.data.data));
            });
        }, 500);
    //eslint-disable-next-line
    }, [])

    return (
        currentUser &&
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <ProtectedShortcuts />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <ProtectedPhotoComponent />
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <FriendsProtected />
                </div>
            </div>
        </div>
    )
}