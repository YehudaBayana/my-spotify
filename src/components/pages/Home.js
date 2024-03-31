import React, { useState, useEffect, useRef, useContext } from "react";
import useAuth from "../../customHooks/useAuth";
import Player from "../features/Player";
import TrackSearchResult from "../features/TrackSearchResult";
import "../../index.css";
import Mobile from "../features/mobile/Mobile";
import { StoreContext } from "../context/ContextProvider";
import useFetchAllMusic from "../../customHooks/useFetchAllMusic";
import AppLayout from "../features/appLayout/AppLayout";

export default function Home({ accessToken }) {
  const { state, dispatch } = useContext(StoreContext);

  const searchRef = useRef("");
  const [playingTrack, setPlayingTrack] = useState();
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  function chooseTrack(track) {
    setPlayingTrack(track);
    dispatch({ type: "setSearch", payload: "" });
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  }

  useFetchAllMusic(accessToken);

  function searchFocus() {
    searchRef.current.focus();
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  return (
    <>
      {windowWith > 500 ? (
        <AppLayout
          accessToken={accessToken}
          playingTrack={playingTrack}
          chooseTrack={chooseTrack}
        />
      ) : (
        <>
          <Mobile
            searchRef={searchRef}
            chooseTrack={chooseTrack}
            myFocus={searchFocus}
          />
          <div className="searchResultsWrapper">
            {state.searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
        </>
      )}
      {/* 
      <div className="playerBackground">
        <div className="playerSticky">
          <div>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
          </div>
        </div>
      </div> */}
    </>
  );
}
