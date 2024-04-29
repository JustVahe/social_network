import { Link } from 'react-router-dom'

export default function UserNavbar() {
  return (
    <div className='relative'>
        <div className="w-full bg-white p-5 flex gap-[50px] pl-[350px] items-center">
            <div>
                <h2 className="text-sky-600 font-semibold text-lg">Janice Joplin</h2>
                <p className="text-zinc-400 text-sm-14">Singer-songwriter</p>
            </div>
            <div className="flex gap-[40px]">
                <Link to={"/feed/userPage"}>
                    <p className="text-zinc-700 font-medium transition hover:text-sky-600">Timeline</p>
                </Link>
                <Link to={"/feed/photos"}>
                    <p className="text-zinc-700 font-medium transition hover:text-sky-600">Photos</p>
                </Link>
                <Link to={"/feed/friends"}>
                    <p className="text-zinc-700 font-medium transition hover:text-sky-600">Friends</p>
                </Link>
            </div>
            </div>
        <div className="shadow-sm shadow-zinc-300 w-[190px] h-[190px] bg-white rounded-full grid place-items-center absolute top-[-130px] left-[150px]">
            <img src="/user-avatar.jpg" className="rounded-full" alt="" />
        </div>
    </div>
  )
}
