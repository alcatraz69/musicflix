import React from 'react'
import './Banner.css'

export default function Banner() {
    return (
        <div className="banner_img">

            <div className="banner_contents">
                <h1 className="title">Welcome to MusicMart</h1>
                <div className="buttons">
                    <button className="banner_btn">Log In</button>
                    <button className="banner_btn">Explore</button>
                </div>
                <h1 className="description">Welcome to MusicMart Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem reiciendis ipsam laudantium obcaecati est ullam eligendi numquam quas. Ipsum, fuga quidem. Nemo quas, explicabo esse dolores impedit at ducimus sequi.</h1>
            </div>
            <div className="fade_bottom"></div>
        </div>
    )
}
