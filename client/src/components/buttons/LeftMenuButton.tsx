import { ReactElement, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { TfiBookmarkAlt, TfiCommentAlt, TfiEraser, TfiImport, TfiLightBulb, TfiMagnet, TfiPanel, TfiStatsUp, TfiThemifyFavicon } from 'react-icons/tfi'

interface IIcons {
    type : string, 
    element : ReactElement
}

const icons : IIcons[] = [
  {
    type : "Newsfeed Page", 
    element : <TfiMagnet />
  },{
    type : "Favourite Page", 
    element : <FaStar />
  },{
    type : "Account Stats", 
    element : <TfiStatsUp />
  },{
    type : "Inbox", 
    element : <TfiImport />
  },{
    type : "Messagse", 
    element : <TfiCommentAlt />
  },{
    type : "Settings", 
    element : <TfiPanel />
  },{
    type : "Faq", 
    element : <TfiLightBulb />
  },{
    type : "Friends", 
    element : <TfiThemifyFavicon />
  },{
    type : "Widgets", 
    element : <TfiEraser />
  },{
    type : "Notifications", 
    element : <TfiBookmarkAlt />
  },

]

export default function LeftMenuButton({ icon } : { 
  icon : string
}) {

  const [toggle, setToggle] = useState(false)

  return (
    <div className="w-[30px] h-[30px] grid place-items-center relative"
        onMouseEnter={() => setToggle(true)} onMouseLeave={() => setToggle(false)}>    
        {icons.find(item => item.type === icon)?.element}     
        <div className={"bg-zinc-800 p-1 rounded-md  text-sm-13 absolute w-[120px] right-[-125px] text-white transition-all	" +
          (toggle ? "opacity-100" : "opacity-0")} >
          {icon} 
        </div>
    </div>
  )
}
