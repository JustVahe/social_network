import { useEffect, useState } from "react";
import { ID, IPhoto } from "../../types";
import Image from "../shared/Image";
import { url } from "../../utils/enviromentConfig";
import { api } from "../../axios/axios";

export default function PhotoComponent({ id }: { id: ID}) {

    const [photos, setPhotos] = useState<IPhoto[] | undefined>();

    useEffect(() => {

        api.get(`${url}/files/` + id)
            .then(res => {
                setPhotos(res.data);
            });

    }, [id]);

    return (
        <>
            <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">

                {(photos && !(photos.length === 0)) ? photos.map(item => {
                    return <Image image={item} alt="user_image" containerStyles="w-full h-[200px]" key={item.id}/>
                }) :
                    <div>
                        <p className="text-lg text-zinc-700">This user has no Images</p>
                    </div>
                }

            </div>
        </>

    )
}
