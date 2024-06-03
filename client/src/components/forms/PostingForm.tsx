import { FaCamera, FaImage, FaMusic, FaVideo } from "react-icons/fa"
import { useAppSelector } from "../../redux/typedHooks"
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";

export default function PostingForm() {

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className="w-full min-h-[160px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] flex gap-5 justify-between rounded-md">
        <img src={"/api/public/"+currentUser?.avatar} alt="admin" className="w-[45px] h-[45px] rounded-full object-cover object-top" />
        <div className="flex flex-grow w-full xl:max-w-[440px] lg:w-[85%] md:w-full min-h-[110px] bg-white border border-zinc-100 rounded-md p-[10px] relative">
          <textarea className="resize-none w-full outline-none" placeholder="write something" />
          <div className="w-[200px] flex justify-between absolute right-[10px] bottom-5 items-center">
            <label htmlFor="music" className="text-zinc-600 cursor-pointer">
              <FaMusic />
            </label>
            <input className="w-0 opacity-0" type="file" name="music" id="music"/>
            <label htmlFor="photo" className="text-zinc-600 cursor-pointer">
              <FaImage />
            </label>
            <input className="w-0 opacity-0" type="photo" name="photo" id="photo"/>
            <label htmlFor="video" className="text-zinc-600 cursor-pointer">
              <FaVideo />
            </label>
            <input className="w-0 opacity-0" type="vider-camera" name="video" id="video"/>
            <label htmlFor="camera" className="text-zinc-600 cursor-pointer">
              <FaCamera />
            </label>
            <input className="w-0 opacity-0" type="camera" name="camera" id="camera"/>
            <button className="px-[20px] py-[5px] leading-[13px] text-white rounded-md bg-sky-600 text-center text-sm-13 font-bold">Post</button>
          </div>
        </div>
    </div>
  )
}
