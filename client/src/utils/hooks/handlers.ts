import { useAppDispatch, useAppSelector } from '../../redux/typedHooks';
import { selectCurrentUser, setPostsOfCurrentUser } from '../../redux/slices/currentUserSlice';
import { ID } from "../../types";
import { notifySuccess } from "../toastification";
import { url } from "../enviromentConfig";
import { api } from '../../axios/axios';

export const useHandlers = () => {

    const currentUser = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    const sortHandler = async () => {
        const sortResponse = await api.get(`${url}/post/?user_id=` + currentUser?.id);
        const sortData = await sortResponse.data;
        dispatch(setPostsOfCurrentUser(sortData));
    }

    const friendRequestAddingHandler = async (from_id: ID, to_id: ID) => {

        const requestResponse = await api.post(`${url}/requests/`, {
            from_id, to_id
        });

        return await requestResponse.data;

    }

    const friendAddingHandler = async (request_id: string) => {

        const friendResponse = await api.post(`${url}/friends/` + request_id, {
            headers: {
                "Content-type": "application/json"
            }
        });

        const friend = await friendResponse.data;

        return friend;

    }

    const unfriendHandler = async (friend_id: string) => {

        const deleteResponse = await api.delete(`${url}/friends/` + friend_id, { method: "DELETE" });
        const deleteData = await deleteResponse.data;
        notifySuccess(deleteData as string);

    }

    const requestDeclineHandler = async (request_id: ID) => {

        const declineResponse = await api.put(`${url}/requests/` + request_id , {
            method : "PUT"
        });
        const declineData = await declineResponse.data;

        return declineData;

    }

    return { 
        sortHandler, 
        friendAddingHandler, 
        friendRequestAddingHandler, 
        unfriendHandler, 
        requestDeclineHandler
    };

}

