import { FaEdit, FaTrash } from 'react-icons/fa'
import { IPhoto } from '../../types'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useAppSelector } from '../../redux/typedHooks'
import { selectCurrentUser } from '../../redux/slices/currentUserSlice'
import { useState } from 'react'
import ModalWindow from './ModalWindow'
import { imageUrl } from '../../utils/enviromentConfig'

export interface ModalResponse {
    type: string,
    message: string
}

export default function Image({ image, alt, containerStyles, imageStyles, setModalResponse }:
    {
        image: IPhoto,
        alt: string,
        containerStyles?: string,
        imageStyles?: string,
        setModalResponse?: React.Dispatch<React.SetStateAction<ModalResponse | undefined>>
    }) {

    const currentUser = useAppSelector(selectCurrentUser);
    const [modalType, setModalType] = useState<boolean | string>(false);

    return (
        <>
            <div className={containerStyles + " relative"}>
                <img
                    src={imageUrl + image.path}
                    alt={alt}
                    className={"w-full h-full object-cover " + imageStyles}
                />
                <div className='w-full flex gap-2.5 p-2.5 bg-zinc-800/40 backdrop-blur-md absolute bottom-0'>
                    <button onClick={() => setModalType("image")} className='text-white'>
                        <FaMagnifyingGlass />
                    </button>
                    {
                        (currentUser && currentUser.id === image.user_id) &&
                        <>
                            <button
                                onClick={() => {
                                    setModalType("update_image");
                                }}
                                className='text-white'>
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => {
                                    if (image.post_id) {
                                        setModalType("are_you_sure_to_delete_this_image_related_to_post");
                                    } else {
                                        setModalType("are_you_sure_to_delete_this_image");
                                    }
                                }}
                                className='text-white'>
                                <FaTrash />
                            </button>
                        </>
                    }
                </div>
            </div>
            {
                modalType && <ModalWindow 
                    image={image} 
                    type={modalType} 
                    setModalType={setModalType} 
                    setModalResponse={setModalResponse as React.Dispatch<React.SetStateAction<ModalResponse | undefined>>} />
            }
        </>

    )
}
