import Friends from "./Friends";
import NewsfeedComponent from "./NewsfeedComponent";
import PostingForm from "./PostingForm";
import Shortcuts from "./Shortcuts";

export default function Feed() {

  return (
   <>
      <div className="container relative mt-[100px]">
        <div className="w-full grid gap-5 lg:grid-cols-1 xl:grid-cols-[[first]_140px_[line2]_150px_[line3]_auto_[col4-start]_150px_[five]_140px_[end]]">
            <div className="xl:col-span-2 gap-5 sm:col-span-1">
                <Shortcuts />
            </div>
            <div className="flex flex-col gap-5 sm:col-span-1">
                <PostingForm />
                <NewsfeedComponent />
            </div>
            <div className="xl:col-span-2 gap-5 sm:col-span-1">
                <Friends />
            </div>
        </div>
      </div>
   </> 
    
  )
}
