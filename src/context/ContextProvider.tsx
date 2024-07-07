import React, { useReducer, createContext, ReactNode } from "react";
// import SpotifyWebApi from "spotify-web-api-node";
import { reducerActionTypes, clientId } from "../constants";

// Initialize Spotify Web API instance
// const spotifyApi = new SpotifyWebApi({
//   clientId,
// });

// Define initial state interface
interface InitialState {
  // spotifyApi: SpotifyWebApi;
  accessToken: string;
  search: string;
  searchResults: any[]; // Adjust type as per your actual data structure
  playingTrack: any | null; // Adjust type as per your actual data structure
  isClicked: boolean;
  userPlaylists: any[]; // Adjust type as per your actual data structure
  userAlbums: any[]; // Adjust type as per your actual data structure
  genres: string[]; // Adjust type as per your actual data structure
  playlist: any; // Adjust type as per your actual data structure
  album: any; // Adjust type as per your actual data structure
  savedTracks: string;
  detail: string;
  categories: string;
  userName: { id: string };
  isLoading: boolean;
  playlistDes: any[]; // Adjust type as per your actual data structure
  isDragging: boolean;
}

// interface ActionType {
//   payload: any,
//   type: string
// }

// Initial state
const initialState: InitialState = {
  // spotifyApi,
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
  userName: { id: "" },
  isLoading: false,
  playlistDes: [],
  isDragging: false,
};

// Action types for the reducer
type ActionType =
  | { type: string; payload: string }
  | { type: string; payload: string }
  | { type: string; payload: any[] }
  | { type: string; payload: any }
  | { type: string; payload: any }
  | { type: string; payload: any }
  | { type: string; payload: string }
  | { type: string; payload: string }
  | { type: string; payload: any[] }
  | { type: string; payload: any[] }
  | { type: string; payload: string[] }
  | { type: string; payload: string }
  | { type: string; payload: string }
  | { type: string; payload: boolean }
  | {
      type: typeof reducerActionTypes.SET_PLAYLIST_DES;
      payload: any | any[];
    };

// Reducer function
const reducer = (state: InitialState, action: ActionType): InitialState => {
  switch (action.type) {
    case reducerActionTypes.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case reducerActionTypes.SET_IS_DRAGGING:
      return { ...state, isDragging: action.payload };
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
      if (Array.isArray(action.payload)) {
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

// Context creation
export const StoreContext = createContext<{ state: InitialState; dispatch: React.Dispatch<ActionType> }>({
  state: initialState,
  dispatch: () => {},
});

// Context provider component
const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default ContextProvider;
