import Navbar from "../Navbar";
import UserFeed from "./user/UserFeed";
import Footer from "../Footer";
import UserNavbar from "./user/UserNavbar";
import PhotoFeed from "./photos/PhotoFeed";


export default function User({page} : {page : string}) {
  return (
    <>
        <Navbar />
        <header className="w-full h-[530px] overflow-hidden">
            <img src="/headerImg.jpg" className="object-cover w-full h-[530px]"/>
        </header>
        <section>
            <UserNavbar />
        </section>
        <div className="container">
            {
              (page === "timeline") ? <UserFeed /> :
              (page === "photos") ? <PhotoFeed /> : ""
            }
        </div>
        <Footer />
    </>
  )
}
