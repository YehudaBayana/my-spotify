import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

export const SERVER_DOMAIN: string = "http://localhost:5001/";
export const clientId: string = "057cdd5b992444f2858403e816dcae20";

export const reducerActionTypes = {
  SET_ACCESS_TOKEN: "setAccessToken" as const,
  SET_SEARCH: "setSearch" as const,
  SET_SEARCH_RESULTS: "setSearchResults" as const,
  SET_PLAYING_TRACK: "setPlayingTrack" as const,
  SET_IS_CLICKED: "setIsClicked" as const,
  SET_PLAYLIST: "setPlaylist" as const,
  SET_SAVED_TRACKS: "setSavedTracks" as const,
  SET_DETAIL: "setDetail" as const,
  SET_USER_PLAYLISTS: "setUserPlaylists" as const,
  SET_USER_ALBUMS: "setUserAlbums" as const,
  SET_GENRES: "setGenres" as const,
  SET_CATEGORIES: "setCategories" as const,
  SET_USER_DETAILS: "setUserDetails" as const,
  SET_IS_LOADING: "setIsLoading" as const,
  SET_PLAYLIST_DES: "setPlaylistDes" as const,
  SET_ALBUM: "setAlbum" as const,
  SET_IS_DRAGGING: "setIsDragging" as const,
  SET_QUEUE: "setQueue" as const,
  UPDATE_QUEUE: "updateQueue" as const,
  SET_CHECKED_TRACKS: "setCheckedTracks" as const,
  SET_LISTEN_AGAIN_TRACKS: "setListenAgainTracks" as const,
};

export const searchMenu: string[] = ["tracks", "playlists", "artists", "episodes", "shows"];

interface Link {
  text: string;
  path: string;
  icon: JSX.Element;
}

export const links: Link[] = [
  {
    text: "explore",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    text: "search",
    path: "/search",
    icon: <SearchIcon />,
  },
];

export const drawerWidth: number = 240;
export const DRAWER_HEIGHT: number = 80;
export const PLAYLIST_CARD_WIDTH: number = 200;
export const MIN_OPEN_WIDTH: number = 210;
export const CLOSE_WIDTH: number = 70;

export const myColors = {
  main: "#A06BAF",
  background: "#555353",
  backgroundLP: "#191818",
  slider: "#B96AC9",
  secondary: "#A3A3A3",
};

export const playerClasses = ["_ContentRSWP", "_ControlsButtonsRSWP", "_WrapperRSWP", "_ContentWrapperRSWP"];
