import { selectPhoto, setPhoto } from "../../redux/slices/photoSlice"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks"
import { useEffect } from "react";
import { ID } from "../../types";

export default function PhotoComponent({ id }: { id: ID }) {

    const dispatch = useAppDispatch();

    useEffect(() => {

        fetch("/api/files/" + id)
            .then((res) => res.json())
            .then(data => {
                dispatch(setPhoto(data));
            })

    }, [id, dispatch]);

    const photos = useAppSelector(selectPhoto);

    return (
        <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
            {!(photos.length === 0) ? photos.map(item => {
                return <img src={"/api/public" + item.path} className="w-full h-full object-cover object-top" key={item.id} />
            }) :
                <div>
                    <p className="text-lg text-zinc-700">This user has no Images</p>
                </div>
            }
        </div>
    )
}
