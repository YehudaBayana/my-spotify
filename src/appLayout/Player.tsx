import { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { StoreContext } from "../context/ContextProvider";
// import { Track } from "../types"; // Assuming you have a Track type defined in your types file

interface Track {
  id: string;
  name: string;
  album: any;
  uri: string;
  duration_ms: number;
  artists: any;
}

interface PlayerProps {
  accessToken: string;
}

const Player: React.FC<PlayerProps> = ({ accessToken }) => {
  const [play, setPlay] = useState(false);
  const { state } = useContext(StoreContext);
  const { playingTrack } = state;

  useEffect(() => setPlay(true), [state?.playingTrack?.playing?.uri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      styles={{
        activeColor: "black",
        bgColor: "lightgrey",
        color: "black",
        loaderColor: "black",
        sliderColor: "red",
        trackArtistColor: "black",
        trackNameColor: "black",
      }}
      showSaveIcon
      callback={(state) => {
        console.log("state callback ", state);
        console.log("playingTrack  ", playingTrack);

        state.previousTracks = playingTrack?.previousTracks
          .map((track: Track) => ({
            id: track.id,
            name: track.name,
            image: track.album?.images[0].url,
            uri: track.uri,
            durationMs: track.duration_ms,
            artists: track.artists,
          }))
          .slice(0, 2);

        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      hideAttribution={true}
      uris={state?.playingTrack?.playing?.uri ? [state?.playingTrack?.playing?.uri, ...playingTrack?.nextTracks.map((track: Track) => track.uri)] : []}
    />
  );
};

export default Player;
