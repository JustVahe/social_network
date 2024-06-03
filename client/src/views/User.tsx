import Navbar from "../components/menu/Navbar";
import UserFeed from "../components/UserFeed";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";
import PhotoFeed from "../components/photoPageComponents/PhotoFeed";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import UserEditButtons from "../components/buttons/UserEditButtons.tsx";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks.ts";
import { selectIsAuth } from "../redux/slices/isAuthSlice.ts";
import { selectThisUser, setThisUser } from "../redux/slices/thisUserSlice.ts";

export default function User({ page }: { page: string }) {

  const { username } = useParams();
  const isAuth = useAppSelector(selectIsAuth);
  const thisUser = useAppSelector(selectThisUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("/api/users/" + username)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setThisUser(data));
      });

  }, [username, isAuth, dispatch]);

  return (
    <>
      <Navbar />
      <header className="w-full h-[530px] overflow-hidden relative">
        <img
          src={"/api/public"+thisUser?.headerImg}
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
              <PhotoFeed id={thisUser.id} />
            ) : page === "friends" ? (
              <FriendsFeed id={thisUser.id} />
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
