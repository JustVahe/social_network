import WelcomePage from "./views/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./views/MainPage"
import User from "./views/User"
import { useEffect } from "react"
import { useAppDispatch } from "./redux/typedHooks"
import { setUsers } from "./redux/slices/userSlice"
import { setPost } from "./redux/slices/postSlice"
import { setComment } from "./redux/slices/commentSlice"
import { setPhoto } from "./redux/slices/photoSlice"

function App() {

    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch("http://localhost:8000/api/users")
        .then((res) =>{ 
          return res.json()
        })
        .then(data => {
            dispatch(setUsers(data));
        })
    }, [dispatch])

    useEffect(() => {
      fetch("http://localhost:8000/api/posts")
      .then((res) => res.json())
          .then(data => {
              dispatch(setPost(data));
          })
    }, [dispatch])

    useEffect(() => {
      fetch("http://localhost:8000/api/comments")
      .then((res) => res.json())
          .then(data => {
              dispatch(setComment(data));
          })
    }, [dispatch])

    useEffect(() => {
        fetch("http://localhost:8000/api/photos")
        .then((res) => res.json())
        .then(data => {
            dispatch(setPhoto(data)); 
        })
      }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<WelcomePage type="signIn" />} />
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
