import Friends from "../../feed/Friends";
import Shortcuts from "../../feed/Shortcuts";
import PhotoComponent from "./PhotoComponent";

export default function PhotoFeed() {
  return (
   <>
      <div className="container">
          <div className='grid grid-cols-4 gap-5'>
              <div className="flex w-[290px] gap-5">
                  <Shortcuts />
              </div>
              <div className="flex col-span-2 w-[600px] gap-5 content-start">
                  <PhotoComponent />
              </div>
              <div className="flex w-[290px] gap-5">
                  <Friends />
              </div>
          </div>
      </div>
   </> 
    
  )
}