import WelcomePage from "./views/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./views/MainPage"
import User from "./views/User"
import Redirect from "./components/redirect/Redirect"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<WelcomePage type="signIn" />} />
          <Route path="/redirect" element = {<Redirect />} />
          <Route path="/signUp" element = {<WelcomePage type="signUp" />} />
          <Route path="/:id/feed" element={<MainPage />}></Route>
          <Route path="/:id/userPage" element={<User page="timeline" />}></Route>
          <Route path="/:id/photos" element={<User page="photos" />}></Route>
          <Route path="/:id/friends" element={<User page="friends"  />}></Route>
          <Route path="/:id/messages" element={<User page="messages"  />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
