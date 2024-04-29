import { FaCamera, FaImage, FaMusic, FaVideo } from "react-icons/fa"
import admin from "../../assets/admin.jpg"

export default function PostingForm() {
  return (
    <div className="2xl:max-w-[600px] xl:max-w-[480px] h-[160px] bg-[#fdfdfd] shadow-sm shadow-zinc-300 p-[25px] flex gap-5 justify-between rounded-md">
          <img src={admin} alt="admin" className="w-[60px] h-[60px] rounded-full" />
        <div className="w-full xl:max-w-[420px] h-[110px] bg-white border border-zinc-100 rounded-md p-[10px] relative">
          <textarea className="resize-none w-full outline-none" placeholder="write something" />
          <div className="w-[200px] flex justify-between absolute right-[10px] items-center">
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
