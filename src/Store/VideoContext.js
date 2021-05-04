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
            case "ADD_NEW_PLAYLIST":
                return{
                    ...state,
                    playlist:  [...state.playlist, { name : action.payload, videosID : [] }] 
                    
                };
            case "ADD_TO_PLAYLIST":
                return {...state, 
                    playlist: state.playlist.map((currentPlaylist) => {
                        if (currentPlaylist.name === action.payload.name) {
                            return { ...currentPlaylist, videosID: [...currentPlaylist.videosID, action.payload.id] }
                        } else {
                            return currentPlaylist
                        }
                    })
                };
            case "REMOVE_FROM_PLAYLIST":
                return {
                    ...state,
                    playlist: state.playlist.map((currentPlaylist) => {
                        if (currentPlaylist.name === action.payload.name) {
                            return {...currentPlaylist, videosID: currentPlaylist.videosID.filter(item => item !== action.payload.id)}
                        } else {
                            return currentPlaylist
                        }
                    })
                };
            case "DELETE_PLAYLIST":
                return { ...state, playlist: state.playlist.filter(currentPlaylist => currentPlaylist.name !== action.payload.name) }
            default:
                return state;
            }
        }

        const [state,dispatch]=useReducer(videoListManipulation,{
            videos:[],
            likedVideos:[],
            playlist:[]
            
        })

    return(
        <VideoContext.Provider 
            value={{
                videos:state.videos,
                likedVideos:state.likedVideos,
                dispatch:dispatch,
                playlist:state.playlist
            
                
            }}
        >
            {children}
        </VideoContext.Provider>
    )

}