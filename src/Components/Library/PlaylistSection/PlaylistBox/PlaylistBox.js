import React from "react";
import "./PlaylistBox.css";
import { BsFillTrashFill } from "react-icons/bs";

import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { useContext } from "react";
import { VideoContext } from "../../../../Store/VideoContext";
import { deletePlaylists } from "../../../../Api/index";
import { useAuth } from "../../../../Store/AuthContext";

function PlaylistBox({ current }) {
  const { dispatch } = useContext(VideoContext);
  const {
    authState: { authToken },
  } = useAuth();

  const deletePlaylist = () => {
    const config = {
      headers: {
        authorization: "Bearer " + authToken,
      },
    };
    deletePlaylists(config, current._id);
    dispatch({ type: "DELETE_PLAYLIST", payload: current._id });
  };

  return (
    <div className="playlist-box">
      <h2 className="playlist-box-head">
        {current.playlistName}
        <span onClick={deletePlaylist}>
          <BsFillTrashFill />
        </span>
      </h2>
      {current?.videos?.length === 0 && (
        <div
          style={{
            padding: "2rem 0",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          This Playlist is Empty!!
        </div>
      )}
      {current?.videos?.length !== 0 && (
        <div className="plist-box">
          {current?.videos?.map((item) => {
            return <PlaylistCard current={item} key={item?.id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default PlaylistBox;
