import { useEffect } from "react";
import { useCheck } from "../../hooks/useCheck";
import Shortcuts from "../feed/Shortcuts";
import MessagesComponent from "./MessagesComponent";

export default function MessagesFeed() {

    const {checkAccessToken} = useCheck();

    useEffect(() => {
        checkAccessToken();
    }, [checkAccessToken]);

    return (
        <div className="container my-0">
            <div className='w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                <div className="xl:col-span-1 gap-5 sm:col-span-1">
                    <Shortcuts />
                </div>
                <div className="grid col-span-1 md:col-span-2 lg:col-span-3 w-full gap-5 content-start">
                    <MessagesComponent />
                </div>
            </div>
        </div>  
    )
}
