import { deleteFriendOfThisUser } from "../../../redux/slices/thisUsersFriends";
import { deleteFriendOfCurrrentUser } from "../../../redux/slices/usersFriends";
import { useAppDispatch } from "../../../redux/typedHooks";
import { IFriend } from "../../../types";
import { useHandlers } from "../../../utils/hooks/handlers"

export default function Unfriend({friend, setFriend} : {
    friend : IFriend,
    setFriend : React.Dispatch<React.SetStateAction<IFriend | undefined>>
}) {

    const { unfriendHandler } = useHandlers();
    const dispatch = useAppDispatch();

    return (
        <button 
            onClick={() => {
                unfriendHandler(friend.id as string);
                setFriend(undefined);
                dispatch(deleteFriendOfCurrrentUser(friend));
                dispatch(deleteFriendOfThisUser(friend));
            }}
            className='hidden md:block md:p-[5px] md:transition md:bg-zinc-700 md:text-white md:font-bold md:rounded-md md:hover:bg-sky-600'>
            Unfriend
        </button>
    )
}