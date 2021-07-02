import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { VideoContext } from "../../Store/VideoContext";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import "./VideoPlayer.css";
import { MdThumbUp } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { successToast } from "../Toast/toast";
import { searchLikes } from "../../Utils/Utils";
import { useAuth } from "../../Store/AuthContext";
import { useHistory } from "react-router-dom";
import { addToLikedVideos, removeFromLikedVideos } from "../../Api/index";

export default function VideoPlayer() {
  const {
    authState: { isUserLoggedIn, authToken },
  } = useAuth();
  const history = useHistory();
  const { videos, likedVideos, dispatch } = useContext(VideoContext);
  const { videoID } = useParams();
  const [showModal, setShowModal] = useState(false);

  const video = videos.find((one) => one.id === videoID);

  function handleLikes() {
    const config = {
      headers: {
        authorization: "Bearer " + authToken,
      },
    };
    if (isUserLoggedIn) {
      if (searchLikes(likedVideos, video) === false) {
        addToLikedVideos(config, video);
        dispatch(
          {
            type: "ADD_TO_LIKES",
            payload: video,
          },
          successToast("Added to liked videos")
        );
      } else {
        removeFromLikedVideos(config, video);
        dispatch(
          {
            type: "REMOVE_FROM_LIKES",
            payload: video,
          },
          successToast("removed from liked videos")
        );
      }
    } else {
      history.push("/auth");
    }
  }

  return (
    <div className="video-play">
      <div className="video-player">
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${video?.id}`}
        />
      </div>
      <div className="video-details">
        <div className="details-head">
          <div className="name">{video?.title}</div>
          <div className="button-group">
            <div className="iconpad">
              <MdThumbUp
                color={
                  searchLikes(likedVideos, video) === true ? "#2563eb" : "white"
                }
                size="1.5rem"
                onClick={handleLikes}
              />
            </div>
            <div className="iconpad">
              <MdPlaylistAdd
                size="2.2rem"
                onClick={isUserLoggedIn && (() => setShowModal(true))}
                className="btn-trans"
              />
            </div>

            <PlaylistModal
              video={video}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </div>
        </div>
        <div className="channel">
          <img src={video?.channelImage} alt="avatar" className="avatar sm" />
          {video?.channelName}
        </div>
        <div className="caption">{video?.description}</div>
      </div>
    </div>
  );
}
