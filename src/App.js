import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import PostSearch from "./pages/PostSearch";
import ErrorPage from "./pages/Error";
import Games from "./pages/Games";

// Main App Component
/* eslint-disable */
const Layout = () => {
  
  return (
      <div>
        <div className="pages">
          {/*Website routes for setting up page navigation*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/search" element={<PostSearch />} />
            <Route path="/users/:UserId" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    
  );
};
/* eslint-enable */
export default Layout;

