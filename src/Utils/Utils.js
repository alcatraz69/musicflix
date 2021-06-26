export function searchLikes(likedVideo, currentVideo) {
  const present = likedVideo?.find((item) => item?.id === currentVideo?.id);
  if (present) {
    return true;
  } else {
    return false;
  }
}
