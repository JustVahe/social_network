import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../redux/typedHooks";
import { selectUsers } from "../../redux/slices/userSlice";
import { IUser } from "../../types";
import FriendButton from "../buttons/FriendButton";
import { selectCurrentUser } from "../../redux/slices/currentUserSlice";

export default function MenuRightFriends() {

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);
  const friends = currentUser?.friends;

  return (
    <div className="hidden w-[70px] h-svh bg-white fixed top-0 right-0 z-10 shadow-xl shadow-zinc-300 lg:flex justify-center">
      <div className="mt-[90px] h-[570px] overflow-y-scroll no-scrollbar flex flex-col gap-[20px]">
        
      </div>
    </div>
  )
}
