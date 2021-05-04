import React from 'react'
import './Banner.css'

export default function Banner() {
    return (
        <div className="banner_img">

            <div className="banner_contents">
                <h1 className="title">Welcome to MusicFlix</h1>
                <div className="buttons">
                    <button className="banner_btn">Log In</button>
                    <button className="banner_btn">Explore</button>
                </div>
                <h1 className="description">It's like Netflix for music lessons! Online Lessons for Piano, Guitar, Drums, and Theory on Demand, Best online lessons for both beginners and intermediate guitarists.</h1>
            </div>
            
        </div>
    )
}
