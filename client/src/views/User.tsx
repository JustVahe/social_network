import Navbar from "../components/menu/Navbar";
import UserFeed from "../components/UserFeed";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";
import PhotoFeed from "../components/photoPageComponents/PhotoFeed";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/typedHooks";
import { selectUsers, setUsers } from "../redux/slices/userSlice";
import FriendsFeed from "../components/friends/FriendsFeed";
import MessagesFeed from "../components/messages/MessagesFeed";
import UserEditButtons from "../components/buttons/UserEditButtons.tsx";
import { useEffect } from "react";

export default function User({ page }: { page: string }) {
  const { id } = useParams();

  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUsers(data));
      });
  }, [dispatch]);

  const thisUser = users.find((item) => item.id === id);

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
      {id && (
        <>
          <section>
            <UserNavbar />
          </section>
          <div className="container">
            {page === "timeline" ? (
              <UserFeed id={id} />
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
