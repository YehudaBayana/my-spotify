import { useContext, useEffect } from 'react';
import { StoreContext } from '../components/context/ContextProvider';
import { fetchAllTracks, useFetchSearch } from './useFetchMusicInfo';

const useFetchAllMusic = (accessToken) => {
  const { state, dispatch } = useContext(StoreContext);
  useEffect(() => {
    if (!accessToken) return;
    state.spotifyApi.setAccessToken(accessToken);
  }, [accessToken, state.spotifyApi]);

  useFetchSearch(state.spotifyApi, state.search, accessToken);

  useEffect(() => {
    if (!accessToken) return;

    fetchAllTracks(state.spotifyApi, dispatch);
  }, [accessToken, dispatch, state.spotifyApi]);
};

export default useFetchAllMusic;
