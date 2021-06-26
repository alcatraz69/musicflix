import React from "react";
import "./Explore.css";
import { useContext } from "react";
import { VideoContext } from "../../Store/VideoContext";
import Videocard from "../VideoCard/Videocard";
import { NavLink } from "react-router-dom";

export default function Explore() {
  const { videos } = useContext(VideoContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="explore_txt">All Videos</div>
      <div className="explore">
        {videos.map(
          ({ id, title, category, thumbnail, channelName, description }) => (
            <NavLink
              key={id}
              style={{ textDecoration: "none" }}
              to={`/watch/${id}`}
            >
              <Videocard
                id={id}
                title={title}
                category={category}
                thumbnail={thumbnail}
                channelName={channelName}
                description={description}
              />
            </NavLink>
          )
        )}
      </div>
    </div>
  );
}
