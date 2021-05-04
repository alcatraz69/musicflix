import React from 'react'
import './Banner.css'
import {NavLink} from 'react-router-dom'

export default function Banner() {
    return (
        <div className="banner_img">

            <div className="banner_contents">
                <h1 className="title">Welcome to MusicFlix</h1>
                <div className="buttons">
                     <NavLink to="/" className="banner_btn" >Log In</NavLink>
                     <NavLink to="/explore" className="banner_btn" >Explore</NavLink>
                </div>
                <h1 className="description">It's like Netflix for music lessons! Online Lessons for Piano, Guitar, Drums, and Theory on Demand, Best online lessons for both beginners and intermediate guitarists.</h1>
            </div>
            
        </div>
    )
}
