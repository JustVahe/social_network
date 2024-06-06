import { FaEdit, FaImage } from "react-icons/fa";
import { ID } from "../../types";
import { useCheck } from "../../hooks/useCheck";
import { useAppDispatch } from "../../redux/typedHooks";
import { setUser } from "../../redux/slices/currentUserSlice";

export default function UserEditButtons({ id }: { id: ID }) {
    
    const { checkAccessToken } = useCheck();

    const dispatch = useAppDispatch();

    const formData = new FormData();

    const coverImageEditHandler = async (eventTarget: HTMLInputElement) => {

        if (eventTarget.files) {

            await checkAccessToken();
            formData.append('file', eventTarget.files[0]);

            for (const pair in formData.entries()) {
                console.log(pair);
            }
            
            const updateResponse = await fetch(`/api/files/${id}/header`, {
                method: "PUT",
                body: formData
            });

            const updateData = await updateResponse.json();

            console.log(updateData);

            const getResponse = await fetch(`/api/users/${id}`);

            const getData = await getResponse.json();

            dispatch(setUser(getData));

        }

    }

    return (
        <div className="flex lg:flex-col gap-2.5 bg-zinc-50 backdrop-blur-lg rounded-2xl p-2.5 left-[67%] sm:left-[57%] absolute top-[485px] 
        md:left-[215px] lg:top-[450px] lg:left-[350px] bg-opacity-25 z-20 md:flex-row ">
            <button className="transition hover:text-white">
                <FaEdit />
            </button>
            <input onChange={(event) => {
                const eventTarget = event.target as HTMLInputElement;
                coverImageEditHandler(eventTarget);
            }} type="file" id="file" className="hidden" />
            <label htmlFor="file" className="transition hover:text-white"><FaImage /></label>
        </div>
    )
}