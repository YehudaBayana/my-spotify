import React, { useReducer, createContext } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: '057cdd5b992444f2858403e816dcae20',
});

const initialState = {
  spotifyApi,
  search: '',
  searchResults: '',
  playingTrack: '',
  isClicked: false,
  playList: '',
  savedTracks: '',
  detail: '',
  userPlaylists: '',
  categoryPlaylist: '',
  categories: '',
  userName: '',
  isLoading: false,
};
const reducer = () => {};

const StoreContext = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default ContextProvider;
