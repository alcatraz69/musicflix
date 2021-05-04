import React from 'react'
import {useContext} from 'react'
import {VideoContext} from '../../../Store/VideoContext'
import PlaylistBox from '../PlaylistSection/PlaylistBox/PlaylistBox';
import './PlaylistSection.css'

function PlaylistSec() {

    const {playlist} = useContext(VideoContext)

    return (
        <div>
            <h1 className="section-heading">
                Playlists :
            </h1>
            {playlist.length === 0 && 
               <div className="box" style={{margin:"125px 0"}}>
               No playlists available!
           </div>
            }
            <div className="playlist-container">
                {
                    playlist.map(item => {
                        return (
                            <div key={item.name}>
                                <PlaylistBox current={item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PlaylistSec