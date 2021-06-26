import axios from "axios";

const API = axios.create({ baseURL: "https://musicflix-api.herokuapp.com" });

export const fetchVideos = () => API.get("/videos");
export const register = ({ name, email, password, cpassword }) =>
  API.post("/auth/register", {
    name,
    email,
    password,
    cpassword,
  });

export const login = ({ email, password }) =>
  API.post("/auth/login", {
    email,
    password,
  });

export const getLikedVideos = (config) =>
  API.get("/video/getlikedvideos", config);

export const addToLikedVideos = (config, video) =>
  API.post("/video/addlike", { video: { id: video._id } }, config);

export const removeFromLikedVideos = (config, video) =>
  API.post("/video/removelikedvideos", { video: { id: video._id } }, config);

export const getPlaylists = (config) => API.get("/video/playlist", config);

export const addPlaylists = (config, name) =>
  API.post("/video/playlist", { name }, config);

export const deletePlaylists = (config, playlist) =>
  API.post("/video/playlist/delete", { id: playlist }, config);

export const addVideoToPlaylist = (config, playlistid, video) =>
  API.post(`/video/playlist/${playlistid}`, { id: video }, config);

export const deleteVideoFromPlaylist = (config, playlistid, video) =>
  API.post(`/video/playlist/delete/${playlistid}`, { id: video }, config);
