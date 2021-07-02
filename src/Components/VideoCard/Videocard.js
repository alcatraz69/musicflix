import React from 'react'
import './Videocard.css'

export default function Videocard({id,title,category,thumbnail,channelName,description}) {
    return (
        <div>
            <div className="cards">
            <img className="card-image" src={thumbnail} alt="card-pic" />
            <div className="card-title">
                {title}
            </div>
            <div className="card-text">
                Topic : {category}
            </div>
        </div>
        </div>
    )
}

