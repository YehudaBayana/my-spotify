import React, { useReducer, createContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { fetchPlaylistTracks } from '../../customHooks/useFetchMusicInfo';

const spotifyApi = new SpotifyWebApi({
  clientId: '057cdd5b992444f2858403e816dcae20',
});

const initialState = {
  spotifyApi: spotifyApi,
  search: '',
  searchResults: [],
  playingTrack: null,
  isClicked: false,
  playList: '',
  savedTracks: '',
  detail: '',
  userPlaylists: [],
  categoryPlaylist: [],
  categories: '',
  userName: '',
  isLoading: true,
  playlistDes: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSearch':
      return { ...state, search: action.payload };
    case 'setSearchResults':
      return { ...state, searchResults: action.payload };
    case 'setPlayingTrack':
      return { ...state, playingTrack: action.payload };
    case 'setIsClicked':
      return { ...state, isClicked: !state.isClicked };
    case 'setPlayList':
      return { ...state, playList: action.payload };
    case 'setSavedTracks':
      return { ...state, savedTracks: action.payload };
    case 'setDetail':
      return { ...state, detail: action.payload };
    case 'setUserPlaylists':
      return { ...state, userPlaylists: action.payload };
    case 'setCategoryPlaylist':
      return {
        ...state,
        categoryPlaylist: [...state.categoryPlaylist, action.payload],
      };
    case 'setCategories':
      return { ...state, categories: action.payload };
    case 'setUserName':
      return { ...state, userName: action.payload };
    case 'setIsLoading':
      return { ...state, isLoading: action.payload };
    case 'setPlaylistDes':
      return { ...state, playlistDes: [...state.playlistDes, action.payload] };
    default:
      throw new Error();
  }
};

export const StoreContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getOne(id) {
    let playlist;
    state?.categoryPlaylist?.forEach((play) => {
      if (play?.find((item) => item?.id === id)) {
        playlist = play?.find((item) => item?.id === id);
      }
    });
    if (state?.userPlaylists?.find((item) => item?.id === id)) {
      playlist = state?.userPlaylists?.find((item) => item?.id === id);
    }

    dispatch({ type: 'setDetail', payload: playlist });
    fetchPlaylistTracks(state?.spotifyApi, playlist, dispatch);
  }

  return (
    <StoreContext.Provider value={{ state, dispatch, getOne }}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
