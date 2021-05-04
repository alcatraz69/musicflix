import React from 'react'
import './PlaylistBox.css'
import { BsFillTrashFill } from "react-icons/bs";


import PlaylistCard from '../PlaylistCard/PlaylistCard'
import {useContext} from 'react'
import {VideoContext} from '../../../../Store/VideoContext'

function PlaylistBox({ current }) {

    const {dispatch} = useContext(VideoContext)
    
    

    return (
        <div className="playlist-box">
            <h2 className="playlist-box-head">
                {current.name}
                <span onClick = {() => dispatch({type : "DELETE_PLAYLIST", payload : current})}><BsFillTrashFill/></span>
                    
                    
            </h2>
            {current.videosID.length === 0 &&
                <div
                    style={{
                        padding: "2rem 0",
                        color: "rgba(255,255,255,0.75)"
                    }}
                >
                    This Playlist is Empty!!
                </div>
            }
            {current.videosID.length !== 0 &&
                <div
                    className="plist-box">
                    {
                        current.videosID.map((id) => {
                            return (
                                <PlaylistCard current={id} />
                                
                        )
                            
                        })
                    }
                </div>
            }
        </div>
    )
}

export default PlaylistBox
