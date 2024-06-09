import React, { useReducer, createContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import {
  fetchAlbumTracks,
  fetchPlaylistTracks,
} from "../customHooks/useFetchMusicInfo";
import { reducerActionTypes, clientId } from "../constants";

const spotifyApi = new SpotifyWebApi({
  clientId,
});

const initialState = {
  spotifyApi: spotifyApi,
  accessToken: "",
  search: "",
  searchResults: [],
  playingTrack: null,
  isClicked: false,
  userPlaylists: [],
  userAlbums: [],
  genres: [],
  playlist: {},
  album: {},
  savedTracks: "",
  detail: "",
  categories: "",
  userName: "",
  isLoading: false,
  playlistDes: [],
};

const reducer = (state, action) => {
  console.log("action type ", action.type);
  switch (action.type) {
    case reducerActionTypes.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case reducerActionTypes.SET_SEARCH:
      return { ...state, search: action.payload };
    case reducerActionTypes.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case reducerActionTypes.SET_PLAYING_TRACK:
      return { ...state, playingTrack: action.payload };
    case reducerActionTypes.SET_IS_CLICKED:
      return { ...state, isClicked: !state.isClicked };
    case reducerActionTypes.SET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case reducerActionTypes.SET_ALBUM:
      return { ...state, playlist: action.payload };
    case reducerActionTypes.SET_SAVED_TRACKS:
      return { ...state, savedTracks: action.payload };
    case reducerActionTypes.SET_DETAIL:
      return { ...state, detail: action.payload };
    case reducerActionTypes.SET_USER_PLAYLISTS:
      return { ...state, userPlaylists: action.payload };
    case reducerActionTypes.SET_USER_ALBUMS:
      return { ...state, userAlbums: action.payload };
    case reducerActionTypes.SET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case reducerActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case reducerActionTypes.SET_USER_DETAILS:
      return { ...state, userName: action.payload };
    case reducerActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case reducerActionTypes.SET_PLAYLIST_DES:
      if (typeof action.payload === "object") {
        return {
          ...state,
          playlistDes: [...state.playlistDes, ...action.payload],
        };
      }
      return { ...state, playlistDes: [...state.playlistDes, action.payload] };
    default:
      throw new Error();
  }
};

export const StoreContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function updatePlaylist(id, type = "playlist") {
    if (type === "playlist") {
      let selectedPlaylist;
      state.genres.forEach((playlists) => {
        if (playlists.find((item) => item.id === id)) {
          selectedPlaylist = playlists.find((item) => item.id === id);
        }
      });
      if (state.userPlaylists.find((item) => item.id === id)) {
        selectedPlaylist = state.userPlaylists.find((item) => item.id === id);
      }
      dispatch({ type: "setDetail", payload: selectedPlaylist });
      fetchPlaylistTracks(state.accessToken, selectedPlaylist.id, dispatch);
    }
    if (type === "album") {
      let selectedAlbum;
      if (state.userAlbums.find((item) => item.id === id)) {
        selectedAlbum = state.userAlbums.find((item) => item.id === id);
      }
      dispatch({ type: "setDetail", payload: selectedAlbum });
      fetchAlbumTracks(state.accessToken, selectedAlbum.id, dispatch);
    }
  }

  return (
    <StoreContext.Provider value={{ state, dispatch, updatePlaylist }}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
