import SortingBar from "../buttons/SortingBar";
import ImgSendingForm from "../forms/ImgSendingForm";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";

export default function ProtectedPhotoComponent() {

    const currentUser = useAppSelector(selectCurrentUser);

    return (
        <>
            <SortingBar />
            <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">

                {(currentUser && !(currentUser.files.length === 0)) ? currentUser.files.map(item => {
                    return <img src={"/api/public" + item.path} className="w-full h-[200px] object-cover object-top" key={item.id} />
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
