import Navbar from "../components/menu/Navbar";
import UserFeed from "../components/UserFeed";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";
import PhotoFeed from "../components/photoPageComponents/PhotoFeed";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import UserEditButtons from "../components/buttons/UserEditButtons.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../types.ts";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks.ts";
import { selectIsAuth } from "../redux/slices/isAuthSlice.ts";

export default function User({ page }: { page: string }) {

  const { username } = useParams();
  const [thisUser, setThisUser] = useState<IUser | undefined>();
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("/api/users/" + username)
      .then((res) => res.json())
      .then((data) => {
        setThisUser(data);
      });

  }, [username, isAuth, dispatch]);


  return (
    <>
      <Navbar />
      <header className="w-full h-[530px] overflow-hidden relative">
        <img
          src={thisUser?.headerImg}
          className="object-cover w-full h-[530px] object-top"
        />
        <UserEditButtons />
      </header>
      {thisUser && (
        <>
          <section>
            <UserNavbar thisUser={thisUser} />
          </section>
          <div className="container">
            {page === "timeline" ? (
              <UserFeed id={thisUser.id} />
            ) : page === "photos" ? (
              <PhotoFeed />
            ) : page === "friends" ? (
              <FriendsFeed />
            ) : page === "messages" ? (
              <MessagesFeed />
            ) : (
              ""
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
