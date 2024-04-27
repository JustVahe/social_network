import WelcomePage from "./components/welcome/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./components/MainPage"
import User from "./components/pages/User"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<WelcomePage type="signIn" />} />
          <Route path="/signUp" element = {<WelcomePage type="signUp" />} />
          <Route path="/user1" element={<MainPage />}></Route>
          <Route path="/user1/userPage" element={<User page="timeline" />}></Route>
          <Route path="/user1/photos" element={<User page="photos" />}></Route>
          <Route path="/user1/friends" element={<User page="friends"  />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
