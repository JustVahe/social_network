import Friends from "../friends/Friends";
import Shortcuts from "../feed/Shortcuts";
import PhotoComponent from "./PhotoComponent";

export default function PhotoFeed() {
    return (
        <div className="container my-0">
            <div className='w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]'>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Shortcuts />
                </div>
                <div className="grid sm:col-span-1 w-full gap-5 content-start">
                    <PhotoComponent/>
                </div>
                <div className="xl:col-span-2 gap-5 sm:col-span-1">
                    <Friends />
                </div>
            </div>
        </div>    
    )
}