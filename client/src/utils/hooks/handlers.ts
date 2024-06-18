import { useCheck } from "./useCheck";
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { selectCurrentUser, sortPostsOfCurrentUser } from '../../redux/slices/currentUserSlice';

export const useHandlers = () => {

    const { checkAccessToken } = useCheck();
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const sortHandler = async () => {

        await checkAccessToken();

        const sortResponse = await fetch("/api/posts/?user_id=" + currentUser?.id);
        const sortData = await sortResponse.json();

        dispatch(sortPostsOfCurrentUser(sortData));
    }

    return {sortHandler};

}

