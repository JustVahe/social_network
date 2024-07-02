import Shortcuts from "../menu/Shortcuts";
import MessagesComponent from "./MessagesComponent";
import { useAppSelector } from "../../redux/typedHooks";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";
import {connect} from "socket.io-client";

connect("http://localhost:8246");

export default function MessagesFeed() {
    
    const currentUser = useAppSelector(selectCurrentUser);

    return (
        currentUser &&
        <div className="container my-0">
            <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                <div className="xl:col-span-1 gap-5 sm:col-span-1">
                    <Shortcuts user={currentUser} />
                </div>
                <div className="grid col-span-1 md:col-span-2 lg:col-span-3 w-full gap-5 content-start">
                    <MessagesComponent />
                </div>
            </div>
        </div>
    )
}
