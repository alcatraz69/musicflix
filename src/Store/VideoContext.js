import { createContext, useEffect, useReducer } from "react";
import { fetchVideos, getLikedVideos, getPlaylists } from "../Api/index";
import { useAuth } from "./AuthContext";
export const VideoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const {
    authState: { authToken },
  } = useAuth();
  const getAllVideos = async () => {
    try {
      const data = await fetchVideos();
      dispatch({
        type: "LOAD_VIDEO_LIST",
        payload: [...data.data.videos],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const loadLikedVideos = async ({ token }) => {
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    try {
      const { data } = await getLikedVideos(config);
      if (data) {
        dispatch({
          type: "LOAD_LIKED_VIDEOS_FROM_SERVER",
          payload: [...data],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken)
      loadLikedVideos({
        token: authToken,
      });
  }, [authToken]);

  const loadPlaylists = async ({ token }) => {
    const config = {
      headers: {
        authorization: "Bearer " + token,
      },
    };
    try {
      const { data } = await getPlaylists(config);
      if (data) {
        dispatch({
          type: "LOAD_PLAYLIST_FROM_SERVER",
          payload: [...data],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken)
      loadPlaylists({
        token: authToken,
      });
  }, [authToken]);

  const videoListManipulation = (state, action) => {
    switch (action.type) {
      case "LOAD_VIDEO_LIST":
        return {
          ...state,
          videos: action.payload.map((item) => ({
            ...item,
            inLikes: false,
            inWatchlist: false,
          })),
        };
      case "LOAD_LIKED_VIDEOS_FROM_SERVER":
        return {
          ...state,
          likedVideos: [...action.payload],
        };

      case "LOAD_PLAYLIST_FROM_SERVER":
        return {
          ...state,
          playlist: [...action.payload],
        };

      case "ADD_TO_LIKES":
        // return {
        //   ...state,
        //   likedVideos: [
        //     ...state.likedVideos,
        //     ...state.videos
        //       .filter((video) => video.id === action.payload)
        //       .map((item) => ({ ...item, inLikes: true })),
        //   ],
        //   videos: state.videos.map((video) =>
        //     video.id === action.payload ? { ...video, inLikes: true } : video
        //   ),
        // };

        return {
          ...state,
          likedVideos: [...state.likedVideos, action.payload],
        };
      case "REMOVE_FROM_LIKES":
        // return {
        //   ...state,
        //   likedVideos: state.likedVideos.filter(
        //     (video) => video.id !== action.payload
        //   ),
        //   videos: state.videos.map((video) =>
        //     video.id === action.payload ? { ...video, inLikes: false } : video
        //   ),
        // };

        return {
          ...state,
          likedVideos: state.likedVideos.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      case "ADD_NEW_PLAYLIST":
        return {
          ...state,
          playlist: [...state.playlist, action.payload.newPlaylist],
        };
      case "ADD_TO_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.map((currentPlaylist) => {
            if (currentPlaylist._id === action.payload.id) {
              return {
                ...currentPlaylist,
                videos: [...currentPlaylist.videos, action.payload.video],
              };
            } else {
              return currentPlaylist;
            }
          }),
        };
      case "REMOVE_FROM_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.map((currentPlaylist) => {
            if (currentPlaylist._id === action.payload.id) {
              return {
                ...currentPlaylist,
                videos: currentPlaylist.videos.filter(
                  (item) => item._id !== action.payload.video
                ),
              };
            } else {
              return currentPlaylist;
            }
          }),
        };
      case "DELETE_PLAYLIST":
        return {
          ...state,
          playlist: state.playlist.filter(
            (currentPlaylist) => currentPlaylist._id !== action.payload
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(videoListManipulation, {
    videos: [],
    likedVideos: [],
    playlist: [],
  });

  return (
    <VideoContext.Provider
      value={{
        videos: state.videos,
        likedVideos: state.likedVideos,
        dispatch: dispatch,
        playlist: state.playlist,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};
