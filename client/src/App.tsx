import WelcomePage from "./views/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./views/MainPage"
import User from "./views/User"
import Redirect from "./components/redirect/Redirect"
import { useEffect } from "react"
import { useAppDispatch } from "./redux/typedHooks"
import { setIsAuth } from "./redux/slices/isAuthSlice"

function App() {

  const dispatch = useAppDispatch();

  async function checkIsAuth() {

    if (localStorage.accessToken) {

      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            accessToken: localStorage.accessToken
          }
        })

        const parsedResponse = await response.json();
        parsedResponse === true ? dispatch(setIsAuth(true)) : dispatch(setIsAuth(false));

      } catch (error) {
        console.error(error);
      }

    }

  }

  useEffect(() => {
    checkIsAuth()
  })

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signIn" element={<WelcomePage type="signIn" />} />
          <Route path="/signUp" element={<WelcomePage type="signUp" />} />
          <Route path="/" element={<Redirect />} />
          <Route path="/dashboard" element={<MainPage />}></Route>
          <Route path="/:username" element={<User page="timeline" />}></Route>
          <Route path="/:username/photos" element={<User page="photos" />}></Route>
          <Route path="/:username/friends" element={<User page="friends" />}></Route>
          <Route path="/:username/messages" element={<User page="messages" />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
