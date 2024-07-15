import { useState, useEffect, useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { StoreContext } from '../context/ContextProvider';
import { TrackShortV } from 'src/types';
import { myColors, reducerActionTypes } from 'src/constants';
import { getUserQueue } from 'src/customHooks/useFetchMusicInfo';

interface PlayerProps {
  accessToken: string;
}

const Player: React.FC<PlayerProps> = ({ accessToken }) => {
  const [play, setPlay] = useState(false);
  const { state, dispatch } = useContext(StoreContext);
  const { playingTrack, queue } = state;

  useEffect(() => {
    const execute = async ()=>{
      const dynamicQueue = await getUserQueue(accessToken);
      console.log("dynamic queue", dynamicQueue);
      
    }
    execute();
    return setPlay(true)
  }, [state?.playingTrack?.playing?.uri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      styles={{
        activeColor: myColors.secondary,
        bgColor: myColors.main,
        color: myColors.secondary,
        loaderColor: myColors.secondary,
        sliderColor: myColors.slider,
        trackArtistColor: myColors.secondary,
        trackNameColor: myColors.secondary,
      }}
      showSaveIcon
      callback={(state) => {
        if (state.track.id) {
          console.log("state ", state);
          
          dispatch({
            type:reducerActionTypes.UPDATE_QUEUE,
            payload: {id: state.track.id, name: state.track.name}
          })
        }
        // console.log('queue ', queue);
        // if (playingTrack?.nextTracks.length > 0 && state.nextTracks.length > 0) {
        //   if (state.nextTracks[0].id === playingTrack?.nextTracks[0]?.id && state.nextTracks[1]?.id === playingTrack?.nextTracks[1]?.id) {
        //     console.log("if");
            
        //     state.previousTracks = playingTrack?.previousTracks;
        //   } else {
        //     console.log("else");
        //     // if (state.previousTracks.length > 0) {
        //       if (state.previousTracks[0]?.id === playingTrack.playing.id) {
        //         console.log("dispatch");
                
        //         dispatch({
        //           type: reducerActionTypes.SET_PLAYING_TRACK,
        //           payload: { previousTracks: [...playingTrack.previousTracks, state.previousTracks[0]], playing: state.track, nextTracks: playingTrack.nextTracks.slice(1) },
        //         });
        //       }
        //     // }
        //   }
        // }
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
