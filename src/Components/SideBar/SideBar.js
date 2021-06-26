import React from "react";

import { NavLink } from "react-router-dom";
import "./SideBar.css";

function SideBar({ setShowMenu, showMenu }) {
  return (
    <div className={showMenu ? "side-bar-bg show" : "side-bar-bg"}>
      <div className={showMenu ? "side-bar view" : "side-bar"}>
        <ul className="nav-links">
          <NavLink
            to="/"
            className="nav-link"
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className="nav-link"
            onClick={() => setShowMenu(false)}
          >
            Explore
          </NavLink>
          <NavLink
            to="/library"
            className="nav-link"
            onClick={() => setShowMenu(false)}
          >
            Library
          </NavLink>
          <NavLink
            to="/account"
            className="nav-link"
            onClick={() => setShowMenu(false)}
          >
            Account
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
