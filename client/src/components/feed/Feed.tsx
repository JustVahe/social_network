import Friends from "./Friends";
import NewsfeedComponent from "./NewsfeedComponent";
import PostingForm from "./PostingForm";
import Shortcuts from "./Shortcuts";

export default function Feed() {
  return (
   <>
      <div className="container">
          <div className='grid grid-cols-4 gap-5 mt-[100px]'>
              <div className="grid w-[290px] gap-5">
                  <Shortcuts />
              </div>
              <div className="grid col-span-2 w-[600px] gap-5 content-start">
                  <PostingForm />
                  <NewsfeedComponent />
              </div>
              <div className="grid w-[290px] gap-5">
                  <Friends />
              </div>
          </div>
      </div>
   </> 
    
  )
}
