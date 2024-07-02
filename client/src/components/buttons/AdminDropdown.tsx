import { TfiPencilAlt, TfiPowerOff, TfiUser } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'

export default function AdminDropdown({userToggle} : {userToggle : boolean}) {

   const navigate = useNavigate();

   return (
      <div className={(userToggle ? "block "  : "hidden ") +" w-[150px] bg-zinc-50 absolute top-[60px] border border-slate-200 right-[-20px] flex flex-col"}>
         <Link to={"/dashboard"}>
            <h1 className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex gap-[10px] items-center">
               <span className="text-sky-600"><TfiUser /></span>
               <p className="text-sm-13">View Profile</p>
            </h1>
         </Link>
         <Link to={"/dashboard/edit"}>
            <h1 className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex gap-[10px] items-center">
               <span className="text-sky-600"><TfiPencilAlt /></span>
               <p className="text-sm-13">Edit Profile</p>
            </h1>
         </Link>
         <button onClick={() => {
            localStorage.clear();
            navigate("/signIn");
         }} className="w-full px-[15px] py-[10px] transition-all hover:bg-zinc-200 flex gap-[10px] items-center">
            <span className="text-sky-600"><TfiPowerOff /></span>
            <p className="text-sm-13">Log Out</p>
         </button>
      </div>
   )
}
