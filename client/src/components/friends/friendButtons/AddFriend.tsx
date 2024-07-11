import { useState } from "react";
import { IRequest, IUser } from "../../../types";
import { useHandlers } from "../../../utils/hooks/handlers"
import { notifyPromise } from "../../../utils/toastification";

export default function AddFriend({ from, to, setRequest }:
    {
        from: IUser,
        to: IUser,
        setRequest: React.Dispatch<React.SetStateAction<IRequest | undefined>>
    }) {

    const { friendRequestAddingHandler } = useHandlers();
    const [ok, setOk] = useState(true);

    const requestAddingFunction = async () => {
        try {
            if (ok) {
                const friendRequest = await friendRequestAddingHandler(from.id, to.id);
                setRequest(friendRequest);
                setOk(false);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <button
            onClick={() => notifyPromise(requestAddingFunction, {
                pendingText: "Loading...",
                fulfilledText: "Request is successfully added"
            })}
            className='hidden md:block md:p-[5px] md:transition md:bg-zinc-700 md:text-white md:font-bold md:rounded-md md:hover:bg-sky-600'>
            Add friend
        </button>
    )
}
