import { v4 } from "uuid";
import { selectPhoto, setPhoto } from "../../redux/slices/photoSlice"
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PhotoComponent() {

    const {id} = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch("http://localhost:8000/api/photos")
        .then((res) => res.json())
        .then(data => {
            dispatch(setPhoto(data)); 
        })
      }, [dispatch])

    const photos = useAppSelector(selectPhoto);

    return (
        <div className="w-full grid grid-cols-3 gap-[15px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] rounded-md">
            {(photos.length !== 0) && photos.filter(item => item.userId === id).map(item => {
              return <img src={item.src} className="w-full h-full object-cover object-top" alt={"Janis Joplin-" + (item.id)} key={v4()}/>
            })}
        </div>
    )
}
