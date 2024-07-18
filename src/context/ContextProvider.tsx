import React, { useReducer, createContext, ReactNode } from 'react';
// import SpotifyWebApi from "spotify-web-api-node";
import { reducerActionTypes, clientId } from '../constants';
import { Album, Category, Playlist, Track, TrackShortV } from 'src/types';

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
  playingTrack: { playing: TrackShortV; previousTracks: TrackShortV[]; nextTracks: TrackShortV[] }; // Adjust type as per your actual data structure
  isClicked: boolean;
  userPlaylists: Playlist[]; // Adjust type as per your actual data structure
  userAlbums: Album[]; // Adjust type as per your actual data structure
  genres: {
    id: string;
    items: Playlist[];
  } []; // Adjust type as per your actual data structure
  playlist: Playlist; // Adjust type as per your actual data structure
  album: Album; // Adjust type as per your actual data structure
  savedTracks: Track[];
  detail: string;
  categories: Category[];
  userName: { id: string };
  isLoading: boolean;
  playlistDes: any[]; // Adjust type as per your actual data structure
  isDragging: boolean;
  queue: TrackShortV[];
  checkedTracks: { uri: string }[];
  listenAgainTracks: Track[],
}

// interface ActionType {
//   payload: any,
//   type: string
// }

// Initial state
const initialState: InitialState = {
  // spotifyApi,
  accessToken: '',
  search: '',
  searchResults: [],
  playingTrack: {
    playing: {
      artists: [],
      durationMs: 0,
      id: '',
      image: '',
      name: '',
      uri: '',
    },
    previousTracks: [
      {
        artists: [],
        durationMs: 0,
        id: '',
        image: '',
        name: '',
        uri: '',
      },
    ],
    nextTracks: [
      {
        artists: [],
        durationMs: 0,
        id: '',
        image: '',
        name: '',
        uri: '',
      },
    ],
  },
  isClicked: false,
  userPlaylists: [],
  userAlbums: [],
  genres: [{ id: '', items: [] }],
  playlist: {
    id: '',
    name: '',
    description: '',
    owner: {
      id: '',
    },
    images: [],
    tracks: {
      total: 0,
    },
    snapshot_id: '',
    type: '',
    public: false,
  },
  album: {
    id: '',
    uri: '',
    type: '',
    artists: [],
    images: [],
    name: '',
    popularity: 0,
    release_date: '',
    total_tracks: 0,
    tracks: {
      items: [],
    },
  },
  savedTracks: [],
  detail: '',
  categories: [],
  userName: { id: '' },
  isLoading: false,
  playlistDes: [],
  isDragging: false,
  queue: [],
  checkedTracks: [],
  listenAgainTracks:[]
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
    }
  | { type: string; payload: Playlist[] }
  | { type: string; payload: { uri: string }[] }
  | { type: string; payload: any[] };

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
      const previousTracks = action.payload.previousTracks.map((track: Track | TrackShortV) => ({
        id: track.id,
        name: track.name,
        image: ('album' in track && track.album?.images[0]?.url) || ('image' in track && track.image),
        uri: track.uri,
        durationMs: ('duration_ms' in track ? track.duration_ms : 0) || ('durationMs' in track && track.durationMs),
        artists: track.artists,
      }));
      const nextTracks = action.payload.nextTracks.map((track: Track) => ({
        id: track.id,
        name: track.name,
        image: ('album' in track && track.album?.images[0]?.url) || ('image' in track && track.image),
        uri: track.uri,
        durationMs: ('duration_ms' in track ? track.duration_ms : 0) || ('durationMs' in track && track.durationMs),
        artists: track.artists,
      }));
      const { playing: payPlaying } = action.payload;
      const playing = {
        id: payPlaying.id,
        name: payPlaying.name,
        image: ('album' in payPlaying && payPlaying.album?.images[0]?.url) || ('image' in payPlaying && payPlaying.image),
        uri: payPlaying.uri,
        durationMs: ('duration_ms' in payPlaying ? payPlaying.duration_ms : 0) || ('durationMs' in payPlaying && payPlaying.durationMs),
        artists: payPlaying.artists,
      };
      return {
        ...state,
        playingTrack: {
          previousTracks,
          nextTracks,
          playing,
        },
        queue: [{ ...playing, currentlyPlaying: true }, ...nextTracks], //...previousTracks,
      };
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
      console.log('action.payload ', action.payload);
      // console.log("Array.isArray(action.payload) ",Array.isArray(action.payload));

      if (Array.isArray(action.payload)) {
        return {
          ...state,
          playlistDes: [...state.playlistDes, ...action.payload],
        };
      }
      return { ...state, playlistDes: [...state.playlistDes, action.payload] };
    case reducerActionTypes.SET_QUEUE:
      return { ...state, queue: action.payload };
    case reducerActionTypes.UPDATE_QUEUE:
      return {
        ...state,
        queue: state.queue.map((track) => {
          // console.log("track id", track.id);
          // console.log("action.payload.id", action.payload.id);

          if (track.id === action.payload.id || track.name === action.payload.name) {
            return { ...track, currentlyPlaying: true };
          }
          return { ...track, currentlyPlaying: false };
        }),
      };
    case reducerActionTypes.SET_CHECKED_TRACKS:
      return { ...state, checkedTracks: action.payload };
    case reducerActionTypes.SET_LISTEN_AGAIN_TRACKS:
      return { ...state, listenAgainTracks: action.payload };
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
