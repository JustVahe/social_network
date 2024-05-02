import { v4 } from "uuid";
import { selectUsers } from "../../redux/slices/userSlice"
import { useAppSelector } from "../../redux/typedHooks"
import MessageUser from "./MessageUser";

export default function MessagesLeft() {

    const users = useAppSelector(selectUsers);

    return (
      <div className="col-span-2 xl:col-span-1 border-r border-r-slate-200 flex flex-col">
        {
            users && users.map((item) => <MessageUser user={item} key={v4()} />)
        }
      </div>
    )
}
