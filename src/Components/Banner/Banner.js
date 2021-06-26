import React from "react";
import "./Banner.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Store/AuthContext";

export default function Banner() {
  const { authState } = useAuth();
  return (
    <div className="banner_img">
      <div className="banner_contents">
        {authState.isUserLoggedIn ? <p>Hi, {authState.name}!</p> : ""}
        <h1 className="title">Welcome to MusicFlix</h1>
        <div className="buttons">
          {!authState.isUserLoggedIn && (
            <NavLink to="/auth" className="banner_btn">
              Log In
            </NavLink>
          )}
          <NavLink to="/explore" className="banner_btn">
            Explore
          </NavLink>
        </div>
        <h1 className="description">
          It's like Netflix for music lessons! Online Lessons for Piano, Guitar,
          Drums, and Theory on Demand, Best online lessons for both beginners
          and intermediate guitarists.
        </h1>
      </div>
    </div>
  );
}
