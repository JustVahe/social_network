import { useEffect, useState } from "react";
import { ID, IPhoto } from "../../types";
import SortingBar from "../buttons/SortingBar";
import ImgSendingForm from "../forms/ImgSendingForm";

export default function PhotoComponent({ id, status }: { id: ID, status?: string }) {

    const [photos, setPhotos] = useState<IPhoto[] | undefined>();

    useEffect(() => {

        fetch("/api/files/" + id)
            .then((res) => res.json())
            .then(data => {
                setPhotos(data);
            });

    }, [id]);

    return (
        <>
            <SortingBar />
            <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">

                {(photos && !(photos.length === 0)) ? photos.map(item => {
                    return <img src={"/api/public" + item.path} className="w-full h-[200px] object-cover object-top" key={item.id} />
                }) :
                    <div>
                        <p className="text-lg text-zinc-700">This user has no Images</p>
                    </div>
                }

            </div>
            {
                status === "protected" && <ImgSendingForm />
            }
        </>

    )
}
