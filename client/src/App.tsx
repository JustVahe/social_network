import WelcomePage from "./components/welcome/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./components/MainPage"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<WelcomePage type="signIn" />} />
          <Route path="/signUp" element = {<WelcomePage type="signUp" />} />
          <Route path="/user1" element={<MainPage />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
