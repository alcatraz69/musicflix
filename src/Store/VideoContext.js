import {createContext,useEffect,useReducer} from 'react';
import axios from 'axios';

export const VideoContext=createContext();

export const VideoContextProvider=({children})=>{
    useEffect(()=>{
        (async()=>{
            const data=await axios.get("/api/videos");
            console.log(data);
            dispatch ({
                type:"LOAD_VIDEO_LIST",
                payload:[...data.data.videos]
            })
        })()
    },[])


    const videoListManipulation=(state,action)=>{
        switch (action.type) {
            case "LOAD_VIDEO_LIST":    
                return {
                    ...state,
                    videos:action.payload.map(item=>({...item,inLikes:false,inWatchlist:false}))
                };
            case "ADD_TO_LIKES":
                return{
                    ...state,
                    likedVideos:[...state.likedVideos,...state.videos.filter(video=>video.id===action.payload).map(item=>({...item,inLikes:true}))],
                    videos:state.videos.map(video=>video.id===action.payload?{...video,inLikes:true}:video)
                };
            case "REMOVE_FROM_LIKES":
                return{
                    ...state,
                    likedVideos:state.likedVideos.filter(video=>video.id!==action.payload),
                    videos:state.videos.map(video=>video.id===action.payload?{...video,inLikes:false}:video)
                };
                default:
                    return state;
            }
        }

        const [state,dispatch]=useReducer(videoListManipulation,{
            videos:[],
            likedVideos:[]
            
        })

    return(
        <VideoContext.Provider 
            value={{
                videos:state.videos,
                likedVideos:state.likedVideos,
                dispatch:dispatch
            
                
            }}
        >
            {children}
        </VideoContext.Provider>
    )

}