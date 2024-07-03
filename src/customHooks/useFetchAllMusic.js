import { useContext, useEffect } from "react";
import { StoreContext } from "../context/ContextProvider";
import { fetchAllTracks, useFetchSearch } from "./useFetchMusicInfo";

const useFetchAllMusic = (accessToken) => {
  const { state, dispatch } = useContext(StoreContext);
  // useEffect(() => {
  //   if (!accessToken) return;
  //   state.spotifyApi.setAccessToken(accessToken);
  // }, [accessToken, state.spotifyApi]);

  useEffect(() => {
    if (!accessToken) return;

    fetchAllTracks(state.spotifyApi, dispatch, accessToken);
    return () => {}
  }, [accessToken, dispatch, state.spotifyApi]);
};

export default useFetchAllMusic;
