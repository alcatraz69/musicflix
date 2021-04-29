import React from 'react'


import './SideBar.css'

function SideBar({setShowMenu, showMenu}) {
    return (
        <div className={showMenu ? "side-bar-bg show" : "side-bar-bg"}>
            <div className={showMenu ? "side-bar view" : "side-bar"}>
                <ul className="nav-links">
                    <p to="/" className="nav-link" onClick={() => setShowMenu(false)}>Home</p>
                    <p to="/explore" className="nav-link" onClick = {() => setShowMenu(false)}>Explore</p>
                    <p to="/library" className="nav-link" onClick = {() => setShowMenu(false)}>Library</p>
                    <p to="/account" className="nav-link" onClick = {() => setShowMenu(false)}>Account</p>
                </ul>
            </div>
        </div>
    )
}

export default SideBar
