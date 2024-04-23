import LeftMenuButton from "./buttons/LeftMenuButton";
import { v4 } from "uuid";

export default function MenuLeftButtons() {

    const iconTypes = [
        "Newsfeed Page",
        "Favourite Page",
        "Account Stats",
        "Inbox",
        "Messagse",
        "Settings",
        "Faq",
        "Friends",
        "Widgets",
        "Notifications"
    ]


    return (
      <div className="w-[70px] h-svh bg-white fixed left-0 z-10 shadow-xl shadow-zinc-300 flex justify-center">
          <div className="mt-[100px] flex flex-col h-[560px] justify-between text-lg text-gray-400">
              {
                iconTypes.map((item) => {
                    return <LeftMenuButton icon={item} key={v4()} />
                })
              }
          </div>
      </div>
    )
}
