import MenuLeftButtons from "./MenuLeftButtons";
import MenuRightFriends from "./MenuRightFriends";
import Navbar from "./Navbar";

export default function Menu() {
  return (
      <div className="fixed top-0">
          <Navbar />
          <MenuLeftButtons />
          <MenuRightFriends />
      </div>
  )
}
