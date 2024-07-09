import { useCheck } from "./useCheck";
import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { selectCurrentUser, setPostsOfCurrentUser } from '../../redux/slices/currentUserSlice';
import { ID } from "../../types";
import { notifySuccess } from "../toastification";
import { url } from "../enviromentConfig";

export const useHandlers = () => {

    const { checkAccessToken } = useCheck()
    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const sortHandler = async () => {

        await checkAccessToken();

        const sortResponse = await fetch(`${url}/posts/?user_id=` + currentUser?.id);
        const sortData = await sortResponse.json();

        dispatch(setPostsOfCurrentUser(sortData));
    }

    const friendRequestAddingHandler = async (from_id: ID, to_id: ID) => {

        const requestResponse = await fetch(`${url}/requests/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                from_id, to_id
            })
        });

        return await requestResponse.json();

    }

    const friendAddingHandler = async (request_id: string) => {

        const friendResponse = await fetch(`${url}/friends/` + request_id, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        });

        const friend = await friendResponse.json();

        return friend;

    }

    const unfriendHandler = async (friend_id: string) => {

        const deleteResponse = await fetch(`${url}/friends/` + friend_id, { method: "DELETE" });
        const deleteData = await deleteResponse.json();
        notifySuccess(deleteData as string);

    }

    const requestDeclineHandler = async (request_id: ID) => {

        const declineResponse = await fetch(`${url}/requests/` + request_id , {
            method : "PUT"
        });
        const declineData = await declineResponse.json();

        return declineData;

    }

    return { sortHandler, friendAddingHandler, friendRequestAddingHandler, unfriendHandler, requestDeclineHandler };

}

