import { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { StoreContext } from "../context/ContextProvider";
import { myColors, reducerActionTypes } from "../constants";
import { TrackShortV } from "../types";
import { useAuthContext } from "../context/AuthContextProvider";
// import { TrackShortV } from 'src/types';
// import { myColors, reducerActionTypes } from 'src/constants';
// import { getUserQueue } from 'src/customHooks/useFetchMusicInfo';

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
        activeColor: myColors.background,
        bgColor: myColors.main,
        color: myColors.background,
        loaderColor: myColors.background,
        sliderColor: myColors.slider,
        trackArtistColor: myColors.background,
        trackNameColor: myColors.background,
        sliderTrackColor: myColors.background,
      }}
      showSaveIcon
      callback={(state) => {
        if (state.track.id) {
          // console.log("state ", state);

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

// dispatch({
//   type: reducerActionTypes.SET_PLAYING_TRACK,
//   payload:{previousTracks:mappedPreviousTracks, playingTrack: state.track, nextTracks: playingTrack?.nextTracks}
// })
// dispatch({
//   type: reducerActionTypes.SET_QUEUE,
//   payload: [...mappedPreviousTracks, playingTrack.playing, ...playingTrack?.nextTracks],
// });
// const newNextTrack = playingTrack?.nextTracks;
// const polledOut = newNextTrack.shift();
// mappedPreviousTracks.pop();
// if (state.track.id) {
//   dispatch({
//     type: reducerActionTypes.SET_PLAYING_TRACK,
//     payload: { previousTracks: mappedPreviousTracks, playing: state.track, nextTracks: newNextTrack },
//   });
// }
