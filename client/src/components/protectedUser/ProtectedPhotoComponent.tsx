import ImgSendingForm from "../forms/ImgSendingForm";
import { useAppSelector } from "../../redux/typedHooks";
import Image from "../shared/Image";
import { selectPhoto } from "../../redux/slices/currentUsersPhotosSlice";
import Loading from "../shared/Loading";

export default function ProtectedPhotoComponent() {

    const photosOfCurrentUser = useAppSelector(selectPhoto);

    return (
        <>
            <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
                {
                    photosOfCurrentUser ? (
                        (photosOfCurrentUser.length !== 0) ? photosOfCurrentUser.map(item => {
                            return <Image image={item} alt="user_image" containerStyles="w-full h-[200px]" key={item.id} />
                        }) :
                            <div>
                                <p className="text-lg text-zinc-700">This user has no Images</p>
                            </div>
                    ) : <div className="w-full">
                        <Loading />
                    </div>
                }
            </div>
            <ImgSendingForm />
        </>
    )
}
