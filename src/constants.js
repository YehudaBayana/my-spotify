import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

export const clientId = "057cdd5b992444f2858403e816dcae20";
export const SERVER_DOMAIN = "http://localhost:5001/";

export const reducerActionTypes = {
  SET_ACCESS_TOKEN: "setAccessToken",
  SET_SEARCH: "setSearch",
  SET_SEARCH_RESULTS: "setSearchResults",
  SET_PLAYING_TRACK: "setPlayingTrack",
  SET_IS_CLICKED: "setIsClicked",
  SET_PLAYLIST: "setPlaylist",
  SET_SAVED_TRACKS: "setSavedTracks",
  SET_DETAIL: "setDetail",
  SET_USER_PLAYLISTS: "setUserPlaylists",
  SET_USER_ALBUMS: "setUserAlbums",
  SET_GENRES: "setGenres",
  SET_CATEGORIES: "setCategories",
  SET_USER_DETAILS: "setUserDetails",
  SET_IS_LOADING: "setIsLoading",
  SET_PLAYLIST_DES: "setPlaylistDes",
  SET_ALBUM: "setAlbum",
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
  {
    text: "search",
    path: "/search",
    icon: <SearchIcon />,
  },
];

export const drawerWidth = 240;
export const DRAWERHEIGHT = 65;
export const PLAYLIST_CARD_WIDTH = 200;
export const MIN_OPEN_WIDTH = 210;
export const CLOSE_WIDTH = 70;