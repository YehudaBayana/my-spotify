import HomeIcon from "@mui/icons-material/Home";

export const reducerActionTypes = {
  SET_SEARCH: "setSearch",
  SET_SEARCH_RESULTS: "setSearchResults",
  SET_PLAYING_TRACK: "setPlayingTrack",
  SET_IS_CLICKED: "setIsClicked",
  SET_PLAYLIST: "setPlaylist",
  SET_SAVED_TRACKS: "setSavedTracks",
  SET_DETAIL: "setDetail",
  SET_USER_PLAYLIST: "setUserPlaylists",
  SET_PLAYLISTS: "setPlaylists",
  SET_CATEGORIES: "setCategories",
  SET_USERNAME: "setUserName",
  SET_IS_LOADING: "setIsLoading",
  SET_PLAYLIST_DES: "setPlaylistDes",
};

export const searchMenu = [
  "tracks",
  "playlists",
  "artists",
  "episodes",
  "shows",
];

export const links = [
  {
    text: "home",
    path: "/",
    icon: <HomeIcon />,
  },
];
