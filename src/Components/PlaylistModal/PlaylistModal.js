import React, { useState } from "react";

import { useContext } from "react";
import { VideoContext } from "../../Store/VideoContext";
import { successToast } from "../Toast/toast";
import {
  addPlaylists,
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
} from "../../Api/index";
import { useAuth } from "../../Store/AuthContext";
import "./PlaylistModal.css";

function PlaylistModal({ video, showModal, setShowModal }) {
  const {
    authState: { authToken },
  } = useAuth();
  const { dispatch, playlist } = useContext(VideoContext);
  const [modalInput, setModalInput] = useState("");

  async function addPlaylist(e) {
    const config = {
      headers: {
        authorization: "Bearer " + authToken,
      },
    };
    e.preventDefault();
    if (modalInput.trim().length === 0) return;
    const { data } = await addPlaylists(config, modalInput);
    if (data.success) {
      dispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: { newPlaylist: data.newPlaylist },
      });
      setModalInput("");
    }
  }

  function searchPlaylistsForID(itemID, videoID) {
    if (itemID?.find((oneId) => oneId?._id === videoID)) return true;
    else return false;
  }

  function checkBoxHandler(item) {
    const config = {
      headers: {
        authorization: "Bearer " + authToken,
      },
    };
    if (searchPlaylistsForID(item.videos, video?._id) === true) {
      dispatch(
        {
          type: "REMOVE_FROM_PLAYLIST",
          payload: { id: item._id, video: video._id },
        },
        successToast("Removed from Playlist")
      );
      deleteVideoFromPlaylist(config, item._id, video._id);
    } else {
      dispatch(
        { type: "ADD_TO_PLAYLIST", payload: { id: item._id, video: video } },
        successToast("Added to Playlist")
      );
      addVideoToPlaylist(config, item?._id, video?._id);
    }
  }

  return (
    <div
      onClick={() => setShowModal(false)}
      className={showModal ? "modal-bg" : "modal-bg hide"}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal"
      >
        <div className="modal-heading">
          <div className="text">Add to Playlist</div>
          <svg
            onClick={() => setShowModal(false)}
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div className="modal-options">
          {playlist.map((item, index) => {
            return (
              <div key={index} className="checkbox">
                <label htmlFor={`checkBox${index}`}>
                  <input
                    onChange={() => checkBoxHandler(item)}
                    type="checkbox"
                    name="checkbox"
                    id={`checkBox${index}`}
                    checked={searchPlaylistsForID(item.videos, video?._id)}
                  />
                  {item.playlistName}
                </label>
              </div>
            );
          })}
        </div>
        <form onSubmit={(e) => addPlaylist(e)} className="modal-add">
          <input
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
            type="text"
            placeholder="New PlayList.."
          />
          <button type="submit">CREATE</button>
        </form>
      </div>
    </div>
  );
}

export default PlaylistModal;
