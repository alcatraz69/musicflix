import React from 'react';
import './NavBar.css'
import { NavLink} from "react-router-dom";
import { BsChevronDoubleDown } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";

function NavBar({ showMenu, setShowMenu }) {

    return (
        <nav className="nav-bar">
            <NavLink to="/" style={{textDecoration:"none"}} className="logo">
                MusicFlix
            </NavLink>
            <div className="right-nav">
                <ul>
                    <NavLink to="/"  className="mobile-hide">Home</NavLink>
                    <NavLink to="/explore"  className="mobile-hide">Explore</NavLink>
                    <NavLink to="/library"  className="mobile-hide">Library</NavLink>
                    <NavLink to="/"  className="mobile-hide">Account</NavLink>

                    <li
                        onClick = {() => setShowMenu(!showMenu)}
                        className="mobile-show">
                        {
                            showMenu ? <BsChevronDoubleRight/> :
                            
                            <BsChevronDoubleDown/>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
