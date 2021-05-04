import React from 'react'
import { NavLink } from 'react-router-dom';

import {useContext} from 'react'
import {VideoContext} from '../../../../Store/VideoContext'


function PlaylistCard({ current }) {
    const {videos} = useContext(VideoContext)
    const currVid = videos.find(item => item.id === current)
    
    return (
        <div>
            <NavLink
            style={{textDecoration:"none",display:"grid"}}
            to = {`/watch/${currVid.id}`}
            key={currVid.id}
            className="cards">
                <img className="card-image" src={currVid.thumbnail} alt="card-pic" />
                <div className="card-title">
                    {currVid.title}
                </div>
            </NavLink>
        </div>
    )
}

export default PlaylistCard
