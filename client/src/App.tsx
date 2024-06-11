import WelcomePage from "./views/WelcomePage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MainPage from "./views/MainPage"
import User from "./views/User"
import ProtectedRoute from "./utils/ProtectedRoute"
import ProtectedUser from "./views/ProtectedUser"
import ProtectedHomeRoute from "./utils/ProtectedHomeRoute"

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/signIn" element={<WelcomePage type="signIn" />} />
                    <Route path="/signUp" element={<WelcomePage type="signUp" />} />
                    <Route path="/" element={<ProtectedHomeRoute />} />
                    <Route path="/dashboard" element={<ProtectedRoute>
                        <ProtectedUser page="timeline" />
                    </ProtectedRoute>} />
                    <Route path="/dashboard/photos" element={<ProtectedRoute>
                        <ProtectedUser page="photos" />
                    </ProtectedRoute>} />
                    <Route path="/dashboard/friends" element={<ProtectedRoute>
                        <ProtectedUser page="friends" />
                    </ProtectedRoute>} />
                    <Route path="/dashboard/messages" element={<ProtectedRoute>
                        <ProtectedUser page="messages" />
                    </ProtectedRoute>} />
                    <Route path="/feed" element={<MainPage />} />
                    <Route path="/:username/home" element={<User page="timeline" />} />
                    <Route path="/:username/photos" element={<User page="photos" />} />
                    <Route path="/:username/friends" element={<User page="friends" />} />
                    <Route path="/:username/messages" element={<User page="messages" />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
