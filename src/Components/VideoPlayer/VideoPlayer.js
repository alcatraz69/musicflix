import React from 'react'
import ReactPlayer from 'react-player'
import {useParams} from 'react-router-dom'
import {useContext,useState} from 'react'
import {VideoContext} from '../../Store/VideoContext'
import PlaylistModal from '../PlaylistModal/PlaylistModal'
import './VideoPlayer.css'


export default function VideoPlayer() {
    const {videos,dispatch} = useContext(VideoContext)
    const { videoID } = useParams();
    const [showModal, setShowModal] = useState(false);
    
    const video = videos.find((one) => one.id === videoID)
    
    return (
        <div className="video-play">
        <div className="video-player">
            <ReactPlayer
                        width="100%"
                        height="100%"
                        controls
                        url={`https://www.youtube.com/watch?v=${video.id}`}
                    />

        </div>
        <div className="video-details">
        <div className="details-head">
            <div className="name">
                {video.title}
            </div>
            <div className="button-group">

                <button
                  className="btn-trans"  
                  onClick={() => {video.inLikes?
                  
                    dispatch({
                        type: "REMOVE_FROM_LIKES",
                        payload: video.id,
                      })
                      
                    
                    : 
                  dispatch({
                    type: "ADD_TO_LIKES",
                    payload: video.id,
                  })
                  
              } }
                >
                    {!video.inLikes?"LIKE":"LIKED"}
                </button>
                <button
                onClick={()=>setShowModal(true)}
                    className="btn-trans" 
                >
                    ADD TO PLAYLIST
                </button>
                <PlaylistModal videoID={video.id} showModal={showModal} setShowModal={setShowModal} />
                
            </div>
            
        </div>
        <div className="channel">
            <img
                src={video.channelImage} alt="avatar" className="avatar sm" />
            {video.channelName}
        </div>
        <div className="caption">
            {video.description}
        </div>
    </div>
    </div>
    )
}
