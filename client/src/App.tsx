import WelcomePage from "./components/welcome/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./components/MainPage"
import User from "./components/pages/User"
import { useEffect } from "react"
import { useAppDispatch } from "./redux/typedHooks"
import { setUsers } from "./redux/slices/userSlice"

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch("./json/users.json")
        .then((res) => res.json())
        .then(data => {
            dispatch(setUsers(data));
        })
    }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<WelcomePage type="signIn" />} />
          <Route path="/signUp" element = {<WelcomePage type="signUp" />} />
          <Route path="/feed" element={<MainPage />}></Route>
          <Route path="/feed/:id" element={<User page="timeline" />}></Route>
          <Route path="/feed/:id/photos" element={<User page="photos" />}></Route>
          <Route path="/feed/:id/friends" element={<User page="friends"  />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
