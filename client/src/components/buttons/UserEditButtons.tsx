import { FaEdit, FaImage } from "react-icons/fa";
import { ID } from "../../types";
import { useCheck } from "../../utils/hooks/useCheck";
import { useAppDispatch } from "../../redux/typedHooks";
import { setHeaderImg } from "../../redux/slices/currentUserSlice";
import { notifyPromise } from "../../utils/toastification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { url } from "../../utils/enviromentConfig";
import { api } from "../../axios/axios";

export default function UserEditButtons({ id }: { id: ID }) {

    const { checkAccessToken } = useCheck();
    const dispatch = useAppDispatch();
    const formData = new FormData();
    const navigate = useNavigate();

    const [editToggle, setEditToggle] = useState(false);
    const [coverToggle, setCoverToggle] = useState(false);


    const coverImageEditHandler = async (eventTarget: HTMLInputElement) => {

        if (eventTarget.files) {

            await checkAccessToken();
            formData.append('file', eventTarget.files[0]);
            const headerResponse = await api.put(`${url}/files/${id}/header`, formData, {
                headers: { "Content-Type" : "multipart/form-data"}
            });

            console.log(headerResponse);

            if (headerResponse.status !== 200) {
                throw new Error(headerResponse.data.message);
            }

            dispatch(setHeaderImg(headerResponse.data.headerImg));

        }

    }

    return (
        <div className="flex lg:flex-col gap-2.5 bg-zinc-50 backdrop-blur-lg rounded-2xl p-2.5 left-[67%] sm:left-[57%] absolute top-[485px] 
        md:left-[215px] lg:top-[450px] lg:left-[350px] bg-opacity-25 z-20 md:flex-row">
            <button
                onMouseEnter={() => setEditToggle(true)}
                onMouseLeave={() => setEditToggle(false)}
                onClick={() => navigate("/dashboard/edit")}
                className="transition hover:text-white relative">
                <FaEdit />
                <div className={`w-[80px] text-sm-12 text-white bg-zinc-900 transition absolute 
                    rounded-md left-[35px] top-0 ${editToggle ? "opacity-100" : "opacity-0"}`}> Edit User </div>
            </button>
            <input onChange={(event) => {
                const eventTarget = event.target as HTMLInputElement;
                notifyPromise(coverImageEditHandler(eventTarget), {
                    pendingText: "Loading",
                    fulfilledText: "Cover image successfully uploaded"
                })
            }} type="file" id="file" className="hidden" />
            <label
                htmlFor="file"
                onMouseEnter={() => setCoverToggle(true)}
                onMouseLeave={() => setCoverToggle(false)}
                className="transition hover:text-white relative"><FaImage />
                <div className={`w-[80px] text-sm-12 text-white bg-zinc-900 transition absolute text-center 
                    rounded-md left-[35px] top-0 ${coverToggle ? "opacity-100" : "opacity-0"}`}> Edit Cover </div>
            </label>
        </div>
    )
}