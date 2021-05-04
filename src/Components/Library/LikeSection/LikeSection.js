import React from 'react'
import {useContext} from 'react'
import {VideoContext} from '../../../Store/VideoContext'
import {NavLink} from 'react-router-dom'
import Videocard from '../../VideoCard/Videocard'
import './LikeSection.css'

export default function LikeSection() {
    const {likedVideos} = useContext(VideoContext)
    return (
        <div>
        <h1 className="section-title">
            Liked Videos :
        </h1>
        {
            likedVideos.length === 0 &&
            <div className="like-box">
                No liked videos!
            </div>
        }
        {
            likedVideos.length !== 0 &&
            <div className="like-box">
                {
                    likedVideos.map(({id,title,category,thumbnail,channelName,description}) => {
                        return (
                            <NavLink style={{textDecoration:"none"}} to={`/watch/${id}`}>
                                <Videocard 
                key={id}
                id={id}
                title={title}
                category={category}
                thumbnail={thumbnail}
                channelName={channelName}
                description={description}
                />
                </NavLink>
                        )
                    })
                }
            </div>
        }
            
        </div>
    )
}
