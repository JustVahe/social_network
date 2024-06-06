import Friends from "../friends/Friends";
import Shortcuts from "../feed/Shortcuts";
import PhotoComponent from "./PhotoComponent";
import { ID } from "../../types";
import { useCheck } from "../../hooks/useCheck";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/typedHooks";
import { selectThisUser } from "../../redux/slices/thisUserSlice";

export default function PhotoFeed({id} : {id : ID}) {

    const {checkAccessToken} = useCheck();
    const thisUser = useAppSelector(selectThisUser);

    useEffect(() => {
        checkAccessToken();
    }, [checkAccessToken]);
    
    return (
        thisUser && 
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Shortcuts user={thisUser} />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <PhotoComponent id={id}/>
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Friends id={id}/>
                </div>
            </div>
        </div>    
    )
}