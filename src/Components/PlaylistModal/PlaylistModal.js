import React, { useState } from 'react'

import {useContext} from 'react'
import {VideoContext} from '../../Store/VideoContext'

import './PlaylistModal.css'

function PlaylistModal({ videoID,showModal, setShowModal }) {
    const {dispatch,playlist} = useContext(VideoContext)
    const [modalInput, setModalInput] = useState("");
    
    
    function addPlaylist(e) {
        e.preventDefault();
        if (modalInput.trim().length === 0)
            return
        dispatch({ type: "ADD_NEW_PLAYLIST", payload: modalInput })
        setModalInput("");
    }

     function searchPlaylistsForID(itemID,videoID) {
        if (itemID.filter(oneId => oneId === videoID).length === 0)
            return false
        else
            return true
    }

    function checkBoxHandler(item) {
        if (searchPlaylistsForID(item.videosID, videoID) === true) {
            dispatch({ type: "REMOVE_FROM_PLAYLIST", payload: { name: item.name, id: videoID } })
           
        } else {
            dispatch({ type: "ADD_TO_PLAYLIST", payload: { name: item.name, id: videoID } })
            
        }
    }
    
    return (
        <div
            onClick={() => setShowModal(false)}
            className={showModal ? "modal-bg" : "modal-bg hide"}>
            <div
                onClick={(e) => { e.stopPropagation();}}
                className="modal">
                <div className="modal-heading">
                    <div className="text">Add to Playlist</div>
                    <svg
                        onClick = {() => setShowModal(false)}
                        width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path></svg>
                </div>
                <div className="modal-options">
                    {
                        playlist.map((item,index) => {
                            return (
                                <div
                                    key = {index}
                                    className="checkbox">
                                    <label htmlFor={`checkBox${index}`}>
                                        <input
                                            onChange={() => checkBoxHandler(item)} type="checkbox"
                                            name="checkbox"
                                            id={`checkBox${index}`}
                                            checked = {searchPlaylistsForID(item.videosID, videoID)}
                                        />
                                        {item.name}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
                <form onSubmit={(e) => addPlaylist(e)} className="modal-add">
                    <input
                        value={modalInput}
                        onChange={(e) => setModalInput(e.target.value)}
                        type="text"
                        placeholder="New PlayList.."
                    />
                    <button type="submit" >ADD</button>
                </form>
            </div>
            {/* <Toast toast={toast} setToast={setToast} /> */}
        </div>
    )
}

export default PlaylistModal
