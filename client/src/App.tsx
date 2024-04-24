// import Menu from "./components/Menu"
// import WelcomePage from "./components/welcome/WelcomePage"
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import MainPage from "./components/MainPage"

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/" element = {<WelcomePage type="signIn" />} />
          <Route path="/signUp" element = {<WelcomePage type="signUp" />} />
        </Routes>
      </Router> */}
      <MainPage type={""} />
    </>
  )
}

export default App
