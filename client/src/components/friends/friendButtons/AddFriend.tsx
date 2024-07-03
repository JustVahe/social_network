import { IRequest, IUser } from "../../../types";
import { useHandlers } from "../../../utils/hooks/handlers"

export default function AddFriend({ from, to, setRequest }:
    {
        from: IUser,
        to: IUser,
        setRequest: React.Dispatch<React.SetStateAction<IRequest | undefined>>
    }) {

    const { friendRequestAddingHandler } = useHandlers();

    return (
        <button
            onClick={async () => {
                const friendRequest = await friendRequestAddingHandler(from.id, to.id);
                setRequest(friendRequest);
            }}
            className='hidden md:block md:p-[5px] md:transition md:bg-zinc-700 md:text-white md:font-bold md:rounded-md md:hover:bg-sky-600'>
            Add friend
        </button>
    )
}
