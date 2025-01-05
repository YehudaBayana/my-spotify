import { Avatar, Box, Checkbox, Divider, List, ListItem, ListItemButton, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { TrackShortV } from "../../types";
import { handleCheckboxToggle, handlePlayTrack, msToMinutesAndSeconds } from "../../utils";
import { myColors, reducerActionTypes, SERVER_DOMAIN } from "../../constants";
// import { addTracksToPlaylist } from "../../customHooks/useFetchMusicInfo";
import CheckedTracksActions from "../../pages/playlist/songsList/CheckedTracksActions";
import { Playlist } from '../../types/spotifyResponses';
// import { myColors, reducerActionTypes, SERVER_DOMAIN } from 'src/constants';
// import { StoreContext } from 'src/context/ContextProvider';
// import { addTracksToPlaylist } from 'src/customHooks/useFetchMusicInfo';
// import CheckedTracksActions from 'src/pages/playlist/songsList/CheckedTracksActions';
// import { Playlist, Track, TrackShortV } from 'src/types';
// import { handleCheckboxToggle, handlePlayTrack, msToMinutesAndSeconds } from 'src/utils';
// import CheckedTracksActions from '../songsList/CheckedTracksActions';

const QueueList = ({ currTab }: { currTab: string }) => {
  const { state, dispatch } = React.useContext(StoreContext);
  const [lyrics, setLyrics] = useState("");
  const { checkedTracks, playingTrack, queue } = state;
  const properTracks = queue.filter((item: TrackShortV) => item);
  const currentlyPlaying = queue.find((track) => track.currentlyPlaying);
  //   const properTracks = [...playingTrack?.previousTracks, playingTrack.playing, ...playingTrack?.nextTracks].filter((item: TrackShortV) => item);

  const handleTrackClick = (track: TrackShortV) => {
    handlePlayTrack(properTracks, track, dispatch);
    // const targetCondition = (obj: TrackShortV) => obj.id === track.id;
    //   const targetIndex = properTracks.findIndex(targetCondition);
    //   const previousTracks = targetIndex !== -1 ? properTracks.slice(0, targetIndex) : properTracks;
    //   const nextTracks = targetIndex !== -1 ? properTracks.slice(targetIndex + 1) : [];
    //   dispatch({
    //     type: reducerActionTypes.SET_PLAYING_TRACK,
    //     payload: { playing: track, nextTracks, previousTracks },
    //   });
  };

  useEffect(() => {
    const execute = async () => {
      fetch(`${SERVER_DOMAIN}lyrics?artist=${currentlyPlaying?.artists[0]}&track=${currentlyPlaying?.name}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log("lyrics res ", res);
        })
        .catch((err) => {
          console.log("err lyrics ", err);
        });
    };
    if (currTab === "lyrics") {
      execute();
    }
    return () => { };
  }, [currTab]);

  const handleAddToPlaylist = async (playlist: Playlist) => {
    const body = {
      uris: checkedTracks.map((track) => track.uri),
      position: 0,
    };

    try {
      // const added = await addTracksToPlaylist(playlist.id, body);
      // const res = await added.json();
      // if (res?.snapshot_id) {
      //   // setEdit(false);
      //   dispatch({
      //     type: reducerActionTypes.SET_CHECKED_TRACKS,
      //     payload: [],
      //   });
      // }
    } catch (error) {
      console.log("yuda error ", error);
    }
  };

  return (
    <>
      {checkedTracks.length > 0 && <CheckedTracksActions handleAddToPlaylist={handleAddToPlaylist} />}
      <Box
        sx={{
          background: myColors.background,
          flexGrow: 1,
          overflowY: "auto", // Make this box scrollable if content overflows
        }}
      >
        {currTab === "lyrics" ? (
          <p>lyrics</p>
        ) : (
          <List
            square
            elevation={0}
            style={{
              borderRadius: "0px",
              background: "transparent",
            }}
            component={Paper}
          >
            {properTracks.map((track: TrackShortV, index: number) => {
              if (!track?.id) {
                // console.log("track?.id ",track);
              }
              const isChecked = !!checkedTracks.find((item) => item.uri === track.uri);
              return (
                <React.Fragment key={index}>
                  <List
                    className="list-item"
                    onClick={() => {
                      handleTrackClick(track);
                    }}
                    key={track?.id}
                    sx={{
                      height: "50px",
                      display: "flex",
                      flexDirection: "row",
                      padding: "0",
                      background: track.id === currentlyPlaying?.id ? myColors.secondary : "",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        position: "relative",
                        padding: 0,
                      }}
                      disableRipple
                    >
                      {track.image && (
                        <ListItem
                          sx={{
                            padding: "5px 10px",
                            flex: 2,
                          }}
                          role="none"
                        >
                          <Avatar variant="square" src={track.image} />
                        </ListItem>
                      )}

                      <ListItem
                        sx={{
                          padding: "5px 10px",
                          flex: 25,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          minWidth: 0, // Ensure it can shrink properly
                        }}
                        role="none"
                      >
                        <Box
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                          }}
                        >
                          {track?.name}
                        </Box>
                      </ListItem>

                      <ListItem
                        sx={{
                          padding: "5px 10px",
                          flex: 2,
                        }}
                        role="none"
                      >
                        {msToMinutesAndSeconds(track.durationMs)}
                      </ListItem>

                      <ListItem
                        sx={{
                          padding: "5px 10px",
                          flex: 1,
                          visibility: "visible",
                        }}
                        role="none"
                      >
                        <Checkbox checked={isChecked} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCheckboxToggle(e, track, dispatch, checkedTracks)} />
                      </ListItem>
                    </ListItemButton>
                  </List>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        )}
      </Box>
    </>
  );
};

export default QueueList;
