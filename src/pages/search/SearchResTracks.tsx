import React, { useContext, useState } from "react";
import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { handleCheckboxToggle, msToMinutesAndSeconds } from "../../utils";
import AddIcon from "@mui/icons-material/Add";
// import { addTracksToPlaylist } from 'src/customHooks/useFetchMusicInfo';
// import { StoreContext } from 'src/context/ContextProvider';
// import CheckedTracksActions from 'src/features/songsList/CheckedTracksActions';
// import { Playlist, Track } from 'src/types';
// import { reducerActionTypes } from 'src/constants';
import CheckedTracksActions from "../playlist/songsList/CheckedTracksActions";
// import { Playlist } from "../../types";
import { StoreContext } from "../../context/ContextProvider";
// import { addTracksToPlaylist } from "../../customHooks/useFetchMusicInfo";
import { reducerActionTypes } from "../../constants";
import { Playlist, Track } from '../../types/spotifyResponses';

// interface Track {
//   id: string;
//   name: string;
//   album: {
//     name: string;
//     images: { url: string }[];
//     release_date: string;
//   };
//   duration_ms: number;
//   uri: string;
// }

// interface Playlist {
//   id: string;
//   name: string;
//   description: string;
//   owner: { id: string };
//   images: { url: string }[];
//   tracks: { total: number };
//   snapshot_id: string;
// }

interface SearchResTracksProps {
  handlePlay: (track: Track) => void;
  selectedRes: Track[];
  addToPlaylist: boolean;
  handleAddTrack: (track: Track) => Promise<{ status: number }>;
  setSelectedRes: React.Dispatch<React.SetStateAction<Track[]>>;
  playlistTracks: Track[];
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const SearchResTracks: React.FC<SearchResTracksProps> = ({ handlePlay, selectedRes, addToPlaylist, handleAddTrack, setSelectedRes, playlistTracks, setTracks }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { checkedTracks } = state;

  const handleAddToPlaylist = async (playlist: Playlist) => {
    const body = {
      uris: checkedTracks.map((track) => track.uri),
      position: 0,
    };

    try {
      // const added = await addTracksToPlaylist(playlist.id, body);
      // const { data, post } = usePostRequest(SpotifyApiUrlsPost.ADD_TRACKS_TO_PLAYLIST, { playlist_id: playlist.id }, { uris: checkedTracks.map((checked) => checked.uri) });
      // await post();
      // const res = await data.json();
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
      <TableContainer elevation={0} component={Paper} sx={{ borderRadius: 0, background: "transparent" }}>
        <Table sx={{ minWidth: 450 }} aria-label="caption table">
          <TableBody>
            {Array.isArray(selectedRes) &&
              selectedRes
                ?.filter((obj1) => !playlistTracks?.some((obj2) => obj2.id === obj1.id))
                .map((track) => {
                  const isChecked = !!checkedTracks.find((item) => item.uri === track.uri);
                  return (
                    <TableRow
                      onClick={() => {
                        handlePlay(track);
                      }}
                      key={track.id}
                      sx={{
                        position: "relative",
                        "&:hover .MuiCheckbox-root, &:hover .custom-checkbox": {
                          visibility: "visible",
                        },
                      }}
                    >
                      <TableCell width="10%" align="left" component="th" scope="row">
                        <img src={track.album.images[2].url} loading="lazy" alt="mashu" width={60} height={50} />
                      </TableCell>
                      <TableCell
                        width="30%"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 0,
                        }}
                        align="left"
                        scope="row"
                      >
                        {track.name}
                      </TableCell>
                      <TableCell
                        width="30%"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: 0,
                        }}
                        align="left"
                      >
                        {track.album.name}
                      </TableCell>
                      {addToPlaylist ? (
                        <TableCell width="15%" align="left">
                          <Button
                            onClick={async (e) => {
                              e.stopPropagation();
                              let mashu = await handleAddTrack(track);
                              console.log("mashu ", mashu);
                              if (mashu.status === 200 || mashu.status === 201) {
                                setSelectedRes((old) => old.filter((item) => item.uri !== track.uri));
                                setTracks((old) => [track, ...old]);
                              }
                            }}
                            variant="contained"
                            endIcon={<AddIcon />}
                          >
                            Add
                          </Button>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell width="15%" align="left">
                            {track.album.release_date}
                          </TableCell>
                          <TableCell width="15%" align="left">
                            {msToMinutesAndSeconds(track.duration_ms)}
                          </TableCell>
                          <TableCell className="custom-checkbox">
                            <Checkbox
                              sx={{ visibility: isChecked ? "visible" : "hidden" }}
                              checked={isChecked}
                              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCheckboxToggle(e, track, dispatch, checkedTracks)}
                            />
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SearchResTracks;
