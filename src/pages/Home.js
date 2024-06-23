import React, { useState, useEffect, useRef, useContext } from "react";
import "../index.css";
import { StoreContext } from "../context/ContextProvider";
import useFetchAllMusic from "../customHooks/useFetchAllMusic";
import AppLayout from "../appLayout/AppLayout";
import { useGetHomePagePlaylists } from "../customHooks/useFetchMusicInfo";
import { reducerActionTypes } from "../constants";

export default function Home({ accessToken }) {
  const { dispatch } = useContext(StoreContext);
  const [playingTrack, setPlayingTrack] = useState();
  const [embedControllerState, setEmbedControllerState] = useState();
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  useEffect(() => {
    dispatch({
      type: reducerActionTypes.SET_ACCESS_TOKEN,
      payload: accessToken,
    });
  }, [accessToken]);
  const iframeRef = useRef(null);

  // useEffect(() => {
  //   const windowOnSpotifyIframeApiReady = (IFrameAPI) => {
  //     const element = iframeRef.current;
  //     const options = {
  //       width: '100%',
  //       height: '500px',
  //       uri: 'spotify:episode:7makk4oTQel546B0PZlDM5', // Set default episode here (or null)
  //     };

  //     const callback = (EmbedController) => {
  //       setEmbedControllerState(EmbedController);
  //     };

  //     IFrameAPI.createController(element, options, callback);
  //   };

  //   window.onSpotifyIframeApiReady = windowOnSpotifyIframeApiReady;

  //   return () => {
  //     window.onSpotifyIframeApiReady = null;
  //   };
  // }, []);

  useFetchAllMusic(accessToken);
  useGetHomePagePlaylists(dispatch, accessToken);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  return (
    <>
      <AppLayout
        divRef={iframeRef}
        accessToken={accessToken}
      />
    </>
  );
}
