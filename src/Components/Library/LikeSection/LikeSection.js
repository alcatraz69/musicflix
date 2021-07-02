import React from "react";
import { useContext } from "react";
import { VideoContext } from "../../../Store/VideoContext";
import { NavLink } from "react-router-dom";
import Videocard from "../../VideoCard/Videocard";
import Skeleton from "../../Skeleton/Skeleton";
import "./LikeSection.css";

export default function LikeSection() {
  const { likedVideos, isLoading } = useContext(VideoContext);
  return (
    <div>
      <h1 className="section-title">Liked Videos :</h1>
      <div className="like-box">
        {isLoading ? (
          <Skeleton COUNT={4} />
        ) : likedVideos.length === 0 ? (
          <div className="like-box">No liked videos!</div>
        ) : (
          likedVideos?.map((vid) => {
            return (
              <NavLink
                style={{ textDecoration: "none" }}
                to={`/watch/${vid?.id}`}
                key={vid?.id}
              >
                <Videocard
                  id={vid?.id}
                  title={vid?.title}
                  category={vid?.category}
                  thumbnail={vid?.thumbnail}
                  channelName={vid?.channelName}
                  description={vid?.description}
                />
              </NavLink>
            );
          })
        )}
      </div>
    </div>
  );
}
