import React from 'react'
import './Trending.css'
import {useContext} from 'react'
import {VideoContext} from '../../Store/VideoContext'


export default function Trending() {
    const {videos} = useContext(VideoContext)

    
    return (
        
        <div className="Trending_Body" style={{backgroundColor:"#111",paddingTop:"1px"}}>
            <h1 className="Trending_Txt" style={{margin:"40px 30px",borderBottom:"2px solid",color:"#fff"}}>Trending videos</h1>
        
        <div className="Wrapper">

            {videos.map((video)=>{
                return(
                <div className="item">
                <img src={video.thumbnail} alt=""/>
                <div className="card_des">
                    <p>{video.title}</p>
                    {/* <p>Lorem Ipsum dorem firolu</p> */}
                </div>
            </div>
                )
            })}

        </div>
        </div>
        
    )
}

