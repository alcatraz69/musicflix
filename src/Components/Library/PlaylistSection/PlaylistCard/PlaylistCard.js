import React from "react";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { VideoContext } from "../../../../Store/VideoContext";

function PlaylistCard({ current }) {
  const { videos } = useContext(VideoContext);
  const currVideo = videos.find((item) => item.id === current.id);

  return (
    <div>
      <NavLink
        style={{ textDecoration: "none", display: "grid" }}
        to={`/watch/${currVideo?.id}`}
        key={currVideo?.id}
        className="cards"
      >
        <img className="card-image" src={currVideo?.thumbnail} alt="card-pic" />
        <div className="card-title">{currVideo?.title}</div>
      </NavLink>
    </div>
  );
}

export default PlaylistCard;
