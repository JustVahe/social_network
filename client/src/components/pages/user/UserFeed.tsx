import Friends from "../../feed/Friends";
import NewsfeedComponent from "../../feed/NewsfeedComponent";
import Shortcuts from "../../feed/Shortcuts";

export default function UserFeed() {
  return (
   <>
      <div className="container my-0">
          <div className='grid grid-cols-4 gap-5'>
              <div className="flex w-[290px] gap-5">
                  <Shortcuts />
              </div>
              <div className="flex col-span-2 w-[600px] gap-5 content-start">
                  <NewsfeedComponent />
              </div>
              <div className="flex w-[290px] gap-5">
                  <Friends />
              </div>
          </div>
      </div>
   </> 
    
  )
}