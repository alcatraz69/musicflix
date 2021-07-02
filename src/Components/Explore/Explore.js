import React from "react";
import "./Explore.css";
import { useContext } from "react";
import { VideoContext } from "../../Store/VideoContext";
import Videocard from "../VideoCard/Videocard";
import { NavLink } from "react-router-dom";
import Skeleton from "../Skeleton/Skeleton";

export default function Explore() {
  const { videos, isLoading } = useContext(VideoContext);
  console.log("here", isLoading);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="explore_txt">All Videos</div>
      <div className="explore">
        {isLoading ? (
          <Skeleton COUNT={12} />
        ) : (
          videos.map(
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
          )
        )}
      </div>
    </div>
  );
}
