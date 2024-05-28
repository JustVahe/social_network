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

export default function User({ page }: { page: string }) {

  const {username} = useParams();
  const [thisUser, setThisUser] = useState<IUser | null>();

  useEffect(() => {
    fetch("http://localhost:8246/users/"+username)
      .then((res) => res.json())
      .then((data) => {
        setThisUser(data);
      });
  }, [username]);


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
      {username && (
        <>
          <section>
            <UserNavbar />
          </section>
          <div className="container">
            {page === "timeline" ? (
              <UserFeed id={username} />
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
