import { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { StoreContext } from "../context/ContextProvider";
import { myColors, reducerActionTypes } from "../constants";
import { TrackShortV } from "../types";
import { useAuthContext } from "../context/AuthContextProvider";

const Player: React.FC = () => {
  const [play, setPlay] = useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const { accessToken } = useAuthContext();
  const { playingTrack, queue } = state;

  useEffect(() => {
    return setPlay(true);
  }, [state?.playingTrack?.playing?.uri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      styles={{
        activeColor: myColors.main,
        bgColor: myColors.background,
        color: myColors.main,
        loaderColor: myColors.main,
        sliderColor: myColors.slider,
        trackArtistColor: myColors.main,
        trackNameColor: myColors.main,
        sliderTrackColor: myColors.main,
      }}
      showSaveIcon
      callback={(state) => {
        if (state.track.id) {
          dispatch({
            type: reducerActionTypes.UPDATE_QUEUE,
            payload: { id: state.track.id, name: state.track.name },
          });
        }
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      hideAttribution={true}
      uris={state?.playingTrack?.playing?.uri ? [state?.playingTrack?.playing?.uri, ...playingTrack?.nextTracks.map((track: TrackShortV) => track.uri)] : []}
    />
  );
};

export default Player;