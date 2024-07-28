import React, { useState, useEffect, useRef, useContext } from "react";
import "../../index.css";
import { StoreContext } from '../../context/ContextProvider';
import { reducerActionTypes } from '../../constants';
import useFetchAllMusic from '../../customHooks/useFetchAllMusic';
import { useGetHomePagePlaylists } from '../../customHooks/useFetchMusicInfo';
import AppLayout from '../../appLayout/AppLayout';
// import { StoreContext } from 'src/context/ContextProvider';
// import { reducerActionTypes } from 'src/constants';
// import useFetchAllMusic from 'src/customHooks/useFetchAllMusic';
// import { useGetHomePagePlaylists } from 'src/customHooks/useFetchMusicInfo';
// import AppLayout from 'src/appLayout/AppLayout';
// import useFetchAllMusic from 'src/customHooks/useFetchAllMusic';
// import { useGetHomePagePlaylists } from 'src/customHooks/useFetchMusicInfo';
// import { StoreContext } from "../context/ContextProvider";
// import useFetchAllMusic from "../customHooks/useFetchAllMusic";
// import AppLayout from "../appLayout/AppLayout";
// import { useGetHomePagePlaylists } from "../customHooks/useFetchMusicInfo";
// import { reducerActionTypes } from "../constants";

interface HomeProps {
  accessToken: string;
}

const Home: React.FC<HomeProps> = ({ accessToken }) => {
  const { dispatch } = useContext(StoreContext);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    console.log("HOME.js accessToken ", accessToken);

    dispatch({
      type: reducerActionTypes.SET_ACCESS_TOKEN,
      payload: accessToken,
    });
    return () => {
      // Cleanup if needed
    };
  }, [accessToken, dispatch]);

  const iframeRef = useRef<HTMLDivElement>(null);

  useFetchAllMusic(accessToken);
  useGetHomePagePlaylists(dispatch, accessToken);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <AppLayout divRef={iframeRef} accessToken={accessToken} />
    </>
  );
};

export default Home;

// const [playingTrack, setPlayingTrack] = useState();
// const [embedControllerState, setEmbedControllerState] = useState();
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
