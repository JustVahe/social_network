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
                    <Route path="/signIn" element={<WelcomePage type="signIn" />} />
                    <Route path="/signUp" element={<WelcomePage type="signUp" />} />
                    <Route path="/dashboard" element={<MainPage />} />
                    <Route path="/" element={<Redirect />} />
                    <Route path="/:username" element={<User page="timeline" />} />
                    <Route path="/:username/photos" element={<User page="photos" />} />
                    <Route path="/:username/friends" element={<User page="friends" />} />
                    <Route path="/:username/messages" element={<User page="messages" />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
