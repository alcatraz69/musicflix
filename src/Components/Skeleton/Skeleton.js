import "./Skeleton.css";

function Skeleton({ COUNT }) {
  const VideoSkeleton = () => {
    return (
      <div className="videoSk">
        <div className="videoImgSk"></div>
        <div className="postTitleSk"></div>
        <div className="postTopicSk"></div>
      </div>
    );
  };

  return Array(COUNT).fill(<VideoSkeleton />);
}

export default Skeleton;
