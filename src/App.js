import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PreviousRouteContext from './PreviousRouteContext';
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

// Layout component for user authentication
const Layout = () => {
  
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState();
  const currentLocation = useRef(location.pathname);

  useEffect(() => {
    if (currentLocation.current !== location.pathname) {
      setPreviousLocation(currentLocation.current);
      currentLocation.current = location.pathname;
    }
    if (user.token == null && location.pathname !== '/login') {
      //navigate("/login");
    }
  }, [user, navigate, location]);

  return (
    <PreviousRouteContext.Provider value={previousLocation}>
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
    </PreviousRouteContext.Provider>
  );
};

export default Layout;

